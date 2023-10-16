/* eslint-disable @typescript-eslint/no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import { MATCH_DELAY, MATCH_TIMEOUT, TESTINPUT, TESTREG } from '../../constants';
import { Regex } from '../../features/regex/Regex';
import { HoverItemDispatch, hoverItemReducer } from "../../features/shared/hoverItemReducer";
import { useRegexpWorker } from '../../features/regex/worker/useRegexpWorker';
import { Range } from '../../features/shared/Range';
import { MainLayout } from './MainLayout';
import { RegCheetSheet } from '../../features/cheetsheet/RegCheetSheet';
import { RegExpression } from '../../features/expression/RegExpression';
import { RegExtract } from "../../features/extract/RegExtract";
import { RegFallback } from '../../features/shared/RegFallback';
import { RegMatchList } from '../../features/match_list/RegMatchList';
import { RegReplace } from "../../features/replace/RegReplace";
import { RegSuggestModal } from '../../features/suggest/RegSuggestModal';
import { RegText } from '../../features/text_editor/RegText';
import { EditorRef } from '../../features/text_editor/TextEditor';
import { ProcessingStatus } from '../../features/expression/ProcessingStatus';

type Props = {
  initialReg?: RegExp;
  initialText?: string;
};

export const MainContent = ({ initialReg = TESTREG, initialText = TESTINPUT }: Props) => {
  // console.log("App");
  const editorRef = useRef<EditorRef>(null);

  const [input, setInput] = useState({
    regArgs: { pattern: initialReg.source, flags: initialReg.flags }, // 入力コンポーネントに紐づいており、invalidな値である可能性がある。
    text: initialText,
    isError: false, // 正規表現のエラーの有無
  });

  const reg = useMemo(() =>
    input.isError ? null : new RegExp(input.regArgs.pattern, input.regArgs.flags),
    [input.isError, input.regArgs.flags, input.regArgs.pattern]);

  const { currentText, execArray, running, errorMessage, elapsed } = useRegexpWorker({
    reg: reg,
    isEmpty: input.regArgs.pattern === "",
    text: input.text,
    delay: MATCH_DELAY,
    timeout: MATCH_TIMEOUT,
  });

  const matchList = useMemo(() => Regex.matches(execArray), [execArray]);
  const [hoverItem, dispatch] = useReducer(hoverItemReducer, { item: undefined });

  const handleRegexChange = useCallback((reg: RegExp | null, pattern: string, flags: string) => {
    setInput(prev => ({ ...prev, regArgs: { pattern, flags }, isError: reg === null }));
  }, []);

  const handleTextChange = useCallback((text: string) => {
    setInput(prev => ({ ...prev, text: text }));
  }, []);

  const handleItemClick = useCallback((range: Range) => {
    editorRef.current!.scrollToPos(range.start);
  }, [editorRef]);

  const handleClickSuggestion = useCallback((pattern: string) => {
    setInput(prev => ({ ...prev, regArgs: { pattern: pattern, flags: prev.regArgs.flags } }));
  }, []);

  //--------------------------------------------- 
  // Components

  const processingStatus =
    <ProcessingStatus
      elapsed={elapsed}
      error={errorMessage}
      running={running}
    />

  const suggester =
    <RegSuggestModal
      matches={matchList.map(m => m.text)}
      text={input.text}
      onClickSuggestion={handleClickSuggestion}
    />

  const regExpression =
    <RegExpression
      value={input.regArgs}
      onChange={handleRegexChange}
      tools={[suggester, processingStatus]}
    />

  const regText =
    <RegText
      editorRef={editorRef}
      value={input.text}
      matchList={matchList}
      emphasis={hoverItem.item}
      onChange={handleTextChange}
    />

  const regMatchList =
    <HoverItemDispatch.Provider value={dispatch}>
      <RegFallback isError={input.isError}>
        <RegMatchList
          matchList={matchList}
          onItemClick={handleItemClick}
        />
      </RegFallback>
    </HoverItemDispatch.Provider>

  const regReplace =
    <RegFallback isError={input.isError}>
      <RegReplace
        execArray={execArray}
        text={currentText}
      />
    </RegFallback>

  const regExtract =
    <RegFallback isError={input.isError}>
      <RegExtract
        execArray={execArray}
      />
    </RegFallback>

  const regCheetSheect =
    <RegCheetSheet />

  return (
    <MainLayout
      regExpression={regExpression}
      regText={regText}
      regMatchList={regMatchList}
      regReplace={regReplace}
      regExtract={regExtract}
      regCheetSheet={regCheetSheect}
    />
  );
}
import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RegSuggest } from './RegSuggest';

type Props = {
  matches: string[];
  text: string;
  onClickSuggestion?: (pattern: string) => void;
};

// TODO:dialogとcontentの分離
export const RegSuggestModal = ({ onClickSuggestion, ...rest }: Props) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleClickSuggestion = useCallback((pattern: string) => {
    onClickSuggestion?.(pattern);
    setShow(false);
  }, [onClickSuggestion]);

  return (
    <>
      <Button variant="secondary" size='sm' onClick={handleShow}>
        Suggest
      </Button>

      <Modal show={show} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Suggest pattern (experimental)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegSuggest
            onClickSuggestion={handleClickSuggestion}
            {...rest}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
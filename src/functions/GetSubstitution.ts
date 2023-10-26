// https://tc39.es/ecma262/#sec-getsubstitution
export function GetSubstitution(
  matched: string,
  str: string,
  position: number,
  captures: (string | undefined)[],
  namedCaptures: Record<string, string> | undefined,
  replacementTemplate: string
): string {
  const stringLength = str.length;
  if (position > stringLength) {
    throw new Error(
      `position must be less than or equal to the length of str. position=${position}, stringLength=${stringLength}`
    );
  }

  let result = "";
  let templateRemainder = replacementTemplate;

  while (templateRemainder !== "") {
    let ref = "";
    let refReplacement = "";

    if (templateRemainder.startsWith("$$")) {
      ref = "$$";
      refReplacement = "$";
    } else if (templateRemainder.startsWith("$`")) {
      ref = "$`";
      refReplacement = str.substring(0, position);
    } else if (templateRemainder.startsWith("$&")) {
      ref = "$&";
      refReplacement = matched;
    } else if (templateRemainder.startsWith("$'")) {
      ref = "$'";
      const matchLength = matched.length;
      const tailPos = position + matchLength;
      refReplacement = str.substring(Math.min(tailPos, stringLength));
    } else if (templateRemainder.match(/^\$\d+/)) {
      const digitCount = templateRemainder.match(/^\$\d{2,}/) ? 2 : 1;
      ref = templateRemainder.substring(0, 1 + digitCount);
      const digits = templateRemainder.substring(1, 1 + digitCount);
      const index = parseInt(digits);
      const captureLen = captures.length;
      if (1 <= index && index <= captureLen) {
        const capture = captures[index - 1];
        refReplacement = capture !== undefined ? capture : "";
      } else {
        refReplacement = ref;
      }
    } else if (templateRemainder.startsWith("$<")) {
      const gtPos = templateRemainder.indexOf(">", 0);
      if (gtPos === -1 || namedCaptures === undefined) {
        ref = "$<";
        refReplacement = ref;
      } else {
        ref = templateRemainder.substring(0, gtPos + 1);
        const groupName = templateRemainder.substring(2, gtPos);
        const capture = namedCaptures[groupName];
        if (capture === undefined) {
          refReplacement = "";
        } else {
          refReplacement = capture;
        }
      }
    } else {
      ref = templateRemainder.substring(0, 1);
      refReplacement = ref;
    }

    const refLength = ref.length;
    templateRemainder = templateRemainder.substring(refLength);
    result += refReplacement;
  }

  return result;
}

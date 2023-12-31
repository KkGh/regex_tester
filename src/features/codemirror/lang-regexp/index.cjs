'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lr = require('@lezer/lr');
var language = require('@codemirror/language');
var highlight = require('@lezer/highlight');

// This file was generated by lezer-generator. You probably shouldn't edit it.
const lookaheadNotDecimalDigit = 83;

const zero = 48;
const nine = 57;

const lookahead = new lr.ExternalTokenizer((input, stack) => {
    // 次の文字が数字でないならトークンを消費する
    if (input.next < zero || nine < input.next) {
        input.acceptToken(lookaheadNotDecimalDigit);
    }
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = lr.LRParser.deserialize({
  version: 14,
  states: "0bOQOQOOO#QOQO'#CdO#QOQO'#CgO#QOQO'#CiO#QOQO'#CkOOOO'#Cc'#CcOOOO'#Ca'#CaOOOO'#Cn'#CnO%QOSO'#D[OOOO'#Cv'#CvO%YOWO'#CvO%eOPO'#DTO%jO`O'#DUO%oOpO'#DWO%tO!bO'#DWOOOO'#D['#D[OOOO'#DQ'#DQO%yOSO'#D^OOOO'#Cq'#CqO&OO#tO'#DfO'cOQO'#DrO#QOQO'#DvOOOO'#Cm'#CmOOOO'#C`'#C`O'jOQO'#C`O)yOQO'#C_O*QOQO'#C^QOOOOOO*]OQO,59OO*bOQO,59RO*gOQO,59TO*lOQO,59VO*qO&kO,59^OOOO,59v,59vOOOO'#Cy'#CyO*yOWO'#D}O+bOSO'#CxOOOO'#C}'#C}OOOO'#EO'#EOO+mOWO'#DPO+{OSO'#CwOOOO'#Cw'#CwO,QOQO,59bOOOO,59o,59oO,VO`O,59pOOOO,59r,59rOOOO'#DY'#DYO,[OQO,59rO,aO&jO'#D_OOOO,59x,59xO%TOSO'#D[OOOO'#Dn'#DnOOOO'#Dl'#DlOOOO'#Dj'#DjO-|O#tO'#DiOOOO'#Dh'#DhO.WOQO,5:QO%yOSO'#DtO.]OQO,5:^O#QOQO,5:^O.bOQO,5:bOOOO'#Dy'#DyO.gO&jO'#DyO.lOQO'#DxOOOO,58z,58zOOOO,58y,58yO)yOQO,58xOOOO1G.j1G.jOOOO1G.m1G.mOOOO1G.o1G.oOOOO1G.q1G.qOOOO1G.x1G.xO0rOPO1G.xOOOO'#D}'#D}OOOO-E7{-E7{OOOO-E7|-E7|O%YOWO,59cOOOO1G.|1G.|OOOO1G/[1G/[OOOO1G/^1G/^OOOO'#Da'#DaO0wOQO'#DaO0|O&jO'#D`O1_OSO,59yO1dO#tO,5:TO1nO#tO'#DjOOOO'#Do'#DoOOOO,5:T,5:TOOOO1G/l1G/lOOOO,5:`,5:`OOOO1G/x1G/xO1xOQO1G/xOOOO1G/|1G/|O1}OWO,5:eOOOO,5:d,5:dOOOO1G.d1G.dOOOO7+$d7+$dO2YOWO'#C|OOOO1G.}1G.}OOOO,59{,59{OOOO'#De'#DeO2hOQO'#DeOOOO'#EP'#EPO2mO&jO,59zOOOO1G/e1G/eO&OO#tO1G/oO1dO#tO,5:ZOOOO,5:Z,5:ZOOOO7+%d7+%dOOOO1G0P1G0PO3OO&jO1G0POOOO,5:P,5:POOOO-E7}-E7}OOOO7+%Z7+%ZO&OO#tO1G/uO3TOQO7+%kOOOO7+%a7+%aOOOO<<IV<<IV",
  stateData: "3d~OUUOXPO[QO^RO`SOcVOdfOgWOu`Ov`O!ZcO!ecO!gdO!keO!vXO!wXO!xXO!yXO!zXO!{XO!|YO#PYO#QZO#R[O#S]O#T^O#U_O#VaO!pRP!tRP~OUUOXPO[QO^RO`SOcVOdfOgWOu`Ov`O!ZcO!ecO!gdO!keO!vXO!wXO!xXO!yXO!zXO!{XO!|YO#PYO#QZO#R[O#S]O#T^O#U_O#VaOYRP!pRP~OhpO!PqO~OnrOruO!}rO~O!u{O~Oy|O~O{}O~O}!OO~O#W!QO~Og!SOu`Ov`O!_!VO!a!UO!vXO!wXO!xXO!yXO!zXO!{XO!|YO#PYO#QZO#R[O#S]O#T^O#U_O#Y!TO#Z!TO!d![P~O!i!ZO~P#QO!i!_O!n!_O!o!_O#[!`OUSXXSX[SX^SX`SXcSXdSXgSXuSXvSX!ZSX!eSX!gSX!kSX!pSX!tSX!vSX!wSX!xSX!ySX!zSX!{SX!|SX#PSX#QSX#RSX#SSX#TSX#USX#VSXYSX~OYRP~PQO!p!dO!tQXYQX~OY!eO~OY!fO~OY!gO~OY!hO~Oi!jO!u!iO~OnqXn!qXo!qXrqX!}qX!}!qX#OqX~OnrO!}rOolX~OnrOruO!}rO#OsX~Oo!nO~O#O!oO~Oy!pO~O#O!qO~O!U!rO!V!sO#S]O#T^O~Og!SOu`Ov`O!a!UO!vXO!wXO!xXO!yXO!zXO!{XO!|YO#PYO#QZO#R[O#S]O#T^O#U_O#Y!TO#Z!TO~O!_!vO!d!]X~P,oO!d!zO~OY!|O~OY#OO~Oi#PO~O!i#QOU!lXX!lX[!lX^!lX`!lXc!lXd!lXg!lXu!lXv!lX!Z!lX!e!lX!g!lX!k!lX!p!lX!t!lX!v!lX!w!lX!x!lX!y!lX!z!lX!{!lX!|!lX#P!lX#Q!lX#R!lX#S!lX#T!lX#U!lX#V!lXY!lX~O!u#SO~O!W#VO~O!U#WO!V#XO#S]O#T^O#X!SX~O#X#[O~O!_!VO!d!^X~P,oO!_#^O!d!^X~P,oOY#`O~O#O#aO#]#aO#^#bO~OnrOruO!}rO#OpX~O!W#cO~O!U#WO!V#XO#S]O#T^O#X!Sa~Oi#gO~O#O#iO~O!kX!e!Z[^`^!g~",
  goto: ")x!tPP!u#b#p#|P$Y$fPP$fP$fP$fP$r%OPP%O%[PPP%h%}&Q&TPP&`&cP&i%hPP&l&lP'PP'kP&lP%['n't'wPPP'z%OP(O(X(^P(mP(x)RPP%OP)XP%OP)[)_PPP)b)h)rQkOQlPQmQQnRQoSQ![dQ!^eQ!}!]R#R!dbjOPQRSde!]!dR!cieiOPQRSdei!]!degOPQRSdei!]!deUOPQRSdei!]!deTOPQRSdei!]!dehOPQRSdei!]!defOPQRSdei!]!debOPQRSdei!]!ddbOPQRSdei!]!d_!Tc!W!v!w#]#^#fRzYRxYQsYUuw!n#TR!ktR#U!nXvYw!n#TRyYs`OPQRScdei!W!]!d!v!w#]#^#fr`OPQRScdei!W!]!d!v!w#]#^#fQ!r!QT#W!t#ZR!P^Q!RaR!{!ZR!u!QR!t!QT#Y!t#ZQ!YcQ#e#]R#h#fV!Xc#]#fU!Wc#]#fS!x!W!wQ#]!vR#f#^Y!Vc!v#]#^#fT!w!W!w_!Uc!W!v!w#]#^#fQ!y!WR#_!wR!]dR!bhR!ahQtYR!ltQwYS!mw#TR#T!nQ#Z!tR#d#Z",
  nodeNames: "⚠ Pattern Disjunction Alternative Term Assertion Boundary Lookaround LookaheadPos (?= ) LookaheadNeg (?! LookbehindPos (?<= LookbehindNeg (?<! Atom PatternCharacter NonSyntaxCharacter Any AtomEscape DecimalEscape \\ NonZeroDigit DecimalDigits CharacterClassEscape UnicodePropertyValueExpression UnicodePropertyName UnicodePropertyNameCharacter AsciiLetter = UnicodePropertyValue UnicodePropertyValueCharacter DecimalDigit LoneUnicodePropertyNameOrValue CharacterEscape ControlEscape ControlCharacterEscape NullEscape HexEscapeSequence HexDigit RegExpUnicodeEscapeSequence Hex4Digits CodePoint HexDigits IdentityEscape SyntaxCharacter NamedBackreference GroupName RegExpIdentifierName RegExpIdentifierStart Identifier UnicodeLeadSurrogate UnicodeTrailSurrogate RegExpIdentifierPart CharacterClass [ ClassRanges NonemptyClassRanges ClassAtom - ClassAtomNoDash NonDash ClassEscape NonemptyClassRangesNoDash ] [^ CapturingGroup ( GroupSpecifier ? NonCapturingGroup (?: Quantifier QuantifierPrefix * + |",
  maxTerm: 106,
  skippedNodes: [0],
  repeatNodeCount: 3,
  tokenData: "3s&iRsOt#`tu#gux#`xy#pyz%Pz{%Y{|%c|}%l}!O%}!O!P&U!P!Q#`!Q!R&_!R![)i![!^#`!^!_*T!_!`*^!`!a*g!a!b*p!b!c#`!c!i*y!i!}-r!}#O.T#O#P.f#P#Q2p#Q#R#g#R#S2w#S#T#`#T#Z*y#Z#o-r#o#p3Q#p#q3Z#q#r3d#r;'S#`;'S;=`3m<%lO#`!c#gO!a!bcP!e#pOUP!a!b!PQ!e#yP!a!b!PQ!gP!a!b#|P$PSqr$]![!]$b!^!_$g!_!`$zP$bO[PP$gO!kPP$jQqr$p!_!`$uP$uO`PP$zO^PP%POXP!e%YOYP!a!b!PQ!e%cO!nP!a!b!PQ!e%lO!oP!a!b!PQ!g%uP#^S!a!bcP#q#r%xS%}O#]S!c&UO!_!bcP!e&_OdP!a!b!PQ&g&nRrSi#tyW}p!a!bcP!Q![&w!c!i)Z#T#Z)Z$v'ORi#t}p!Q!['X!c!i({#T#Z({$v'`Ri#t}p!Q!['i!c!i(k#T#Z(k$v'rRi#t{`}p!Q!['{!c!i(]#T#Z(]$f(SRi#t}p!Q!['{!c!i(]#T#Z(]p(bR}p!Q![(]!c!i(]#T#Z(]!Q(rR{`}p!Q![(]!c!i(]#T#Z(]!Q)QR}p!Q![(k!c!i(k#T#Z(k!Q)`R}p!Q![({!c!i({#T#Z({&i)zRrSi#tyW}p!a!bcPhQ!Q![&w!c!i)Z#T#Z)Z!e*^O#WQ!a!bcP!i*gOoU!a!bcP%Z*pO#X#v!a!bcP!e*yO!iP!a!b!PQ&i+YTnUyW}p!U#t!a!bcP!Q![)Z!c!i+i!i!}-g#T#Z+i#Z#o-g$v+pT}p!U#t!Q![({!c!i,P!i!}-g#T#Z,P#Z#o-g$v,WT}p!U#t!Q![(k!c!i,g!i!}-g#T#Z,g#Z#o-g$v,pT{`}p!U#t!Q![(]!c!i-P!i!}-g#T#Z-P#Z#o-g$f-WT}p!U#t!Q![(]!c!i-P!i!}-g#T#Z-P#Z#o-g#t-lQ!U#t!c!}-g#T#o-g%_-}QnU!U#t!a!bcP!c!}-g#T#o-g!e.^P!a!b!PQ!ZP#Q#R.aP.fO!eP%Z.mfg!c!PQ}!O0R!P!Q0W!Q!R0]!d!e0b!f!g0g!r!s0l!u!v0w!y!z0|#U#V1R#V#W1Y#W#X1h#Y#Z1m#_#`1r#b#c1m#d#e1w#f#g1m#g#h2S#h#i1m#i#j2X#j#k1m#k#l2f#l#m2k!b0WO#Z!b!c0]O#U!c!c0bO#Q!cP0gOUP!c0lO!w!c!c0oP#o#p0r!c0wO#P!c!c0|O!y!c!c1RO!{!c!c1YO#Y!bUP!c1]Q!c!}1c#T#o1c!c1hOv!c!c1mO!v!c!c1rOu!cP1wO#VP!c1zP#o#p1}!c2SO!|!c!c2XO!x!c%X2^P#S%X#o#p2a%X2fO#T%X!c2kO!z!c!c2pO#R!c!e2wO!d!c!PQ!i3QO!}U!a!bcP!e3ZO#[P!a!b!PQ!e3dO!pP!a!b!PQ!i3mO#OT!a!b!PQ!c3pP;=`<%l#`",
  tokenizers: [lookahead, 0, 1, 2, 3, 4, 5, 6, 7],
  topRules: {"Pattern":[0,1]},
  tokenPrec: 838
});

const regexpLanguage = language.LRLanguage.define({
    parser: parser.configure({
        props: [
            language.indentNodeProp.add({
            // Application: delimitedIndent({closing: ")", align: false})
            }),
            language.foldNodeProp.add({
            // Application: foldInside
            }),
            highlight.styleTags({
                "| Boundary Quantifier!": highlight.tags.meta,
                "AtomEscape!": highlight.tags.escape,
                "CharacterClass/...": highlight.tags.bracket,
                "Lookaround/...": highlight.tags.paren,
                "CapturingGroup/...": highlight.tags.paren,
                "NonCapturingGroup/...": highlight.tags.paren,
            })
        ]
    }),
    languageData: {
    // commentTokens: { line: ";" }
    }
});
const regexpHighlightStyle = language.HighlightStyle.define([
    { tag: highlight.tags.meta, color: "#6f991a" },
    { tag: highlight.tags.escape, color: "#ffa802" },
    { tag: highlight.tags.bracket, backgroundColor: "#533a3a" },
    { tag: highlight.tags.paren, backgroundColor: "#244069" },
]);
function regexp() {
    return new language.LanguageSupport(regexpLanguage, language.syntaxHighlighting(regexpHighlightStyle));
}

exports.regexp = regexp;
exports.regexpHighlightStyle = regexpHighlightStyle;
exports.regexpLanguage = regexpLanguage;

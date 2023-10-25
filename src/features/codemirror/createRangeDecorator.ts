import {
  Extension,
  RangeSetBuilder,
  StateEffect,
  StateEffectType,
  StateField,
  Transaction,
} from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";

export type HighlightRange = {
  from: number;
  to: number;
};

export type RangeDecorator = {
  add: StateEffectType<HighlightRange[]>;
  clear: StateEffectType<null>;
  field: StateField<DecorationSet>;
  plugin: ViewPlugin<any>;
  extension: Extension;
};

// 範囲リストにクラスを適用する拡張機能を作成する。
export const createRangeDecorator = (className: string): RangeDecorator => {
  const add = StateEffect.define<HighlightRange[]>();

  const clear = StateEffect.define();

  // メモリを節約するためキャッシュする
  const marker = Decoration.mark({ class: className });

  // extensionに追加してください。
  const field = StateField.define<DecorationSet>({
    create: () => Decoration.none,

    update: (value: DecorationSet, tr: Transaction) => {
      value = value.map(tr.changes);

      for (let e of tr.effects) {
        if (e.is(add)) {
          value = value.update({
            add: e.value.map((r) => marker.range(r.from, r.to)),
            sort: true,
          });
        } else if (e.is(clear)) {
          value = Decoration.none;
        }
      }

      return value;
    },

    // ViewPluginでデコレーションを生成するため、StateFieldで provide 関数を定義しない
  });

  // highlightFieldに格納されているデコレーションセットを可視範囲に制限する。
  // extensionに追加してください。
  const plugin = ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = this.createVisibleDeco(view);
      }

      update(update: ViewUpdate) {
        // viewportまたはstatefield変更時にデコレーションセットを再生成する
        const isFieldChanged =
          update.startState.field(field) !== update.state.field(field);
        if (update.docChanged || update.viewportChanged || isFieldChanged) {
          this.decorations = this.createVisibleDeco(update.view);
        }
      }

      private createVisibleDeco(view: EditorView) {
        const decos = view.state.field(field);
        const builder = new RangeSetBuilder<Decoration>();

        // 可視範囲のデコレーションにフィルタする
        if (view.visibleRanges.length > 0) {
          const start = view.visibleRanges[0].from;
          const end = view.visibleRanges[view.visibleRanges.length - 1].to;

          // from ~ to の間にあるDecorationを取り出す。
          // between()はソートされないため一度リストに入れてソートする。
          const visibleDecos: {
            from: number;
            to: number;
            value: Decoration;
          }[] = [];
          decos.between(start, end, (from, to, value) => {
            visibleDecos.push({ from, to, value });
          });
          visibleDecos
            .sort((a, b) => a.from - b.from)
            .forEach((r) => builder.add(r.from, r.to, r.value));

          if (visibleDecos.length > 5000) {
            console.warn(
              `too many decorations: ${visibleDecos.length} in ${decos.size}.`
            );
          }
        }

        return builder.finish();
      }
    },
    {
      decorations: (v) => v.decorations,
    }
  );

  return { add, clear, field, plugin, extension: [field, plugin] };
};

// デバッグ用
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function printDecorationSet(value: DecorationSet) {
  const it = value.iter();
  do {
    console.log(it.value?.spec, `[${it.from}, ${it.to}]`);
    it.next();
  } while (it.value !== null);
}

import TemplateRenderer from "@/shared/components/PdfRenderer";
import { Hr } from "@/shared/components/Menu/Hr";
import { Show, createEffect, createSignal, on, onMount, type Component } from "solid-js";
import PageHeader from "@/screens/Dashboard/components/PageHeader";
import { useI18n } from "@/i18n";
import { useParams } from "@solidjs/router";
import HeaderButton from "@/screens/Dashboard/components/PageHeader/HeaderButton";
import { createCodeMirror } from "solid-codemirror";
import { highlightActiveLineGutter, lineNumbers } from "@codemirror/view";
import type { Extension } from "@codemirror/state";
import { liquid } from "@codemirror/lang-liquid";
import { material } from "@uiw/codemirror-theme-material";
import Popover from "@/shared/components/Popover";

const ManageInvoice: Component = () => {
  const params = useParams<{ readonly id?: string }>();
  const [t] = useI18n();
  const [showRender, setShowRender] = createSignal(false);

  onMount(async () => {});

  const [template, setTemplate] = createSignal(`
  {% assign people = "alice, bob, carol" | split: ", " -%}

  <ul>
  {%- for person in people %}
    <li>
      <a href="{{person | prepend: "http://example.com/"}}">
        {{ person | capitalize }}
      </a>
    </li>
  {%- endfor%}
  </ul>
  
`);

  return (
    <>
      <PageHeader
        title={[
          t("sidebar.section.other"),
          t("sidebar.button.templates"),
          params.id ? params.id : t("pageHeaader.new"),
        ]}
        actionElements={[
          <HeaderButton onClick={() => {}} buttonType="primary">
            Save
          </HeaderButton>,
          <HeaderButton onClick={() => setShowRender(!showRender())} buttonType="secondary">
            {showRender() ? "Edit" : "Preview"}
          </HeaderButton>,
        ]}
      />

      <Editor defaultValue={template()} onValueChange={(value) => setTemplate(value)} />

      <Popover show={showRender()} onClose={() => setShowRender(false)} title="cus">
        <div class="w-full lg:w-1/2 bg-red rounded-xl gap-4 flex flex-col p-4">
          <h1 class="text-xl font-bold">Preview</h1>
          <Hr />
          <TemplateRenderer template={template()} data={{ email: "joe@aa.cz", phone: "12122212" }} />
        </div>
      </Popover>
    </>
  );
};

export default ManageInvoice;

const Editor: Component<{ onValueChange: (value: string) => void; defaultValue: string }> = (props) => {
  const {
    // editorView,
    ref: editorRef,
    createExtension,
  } = createCodeMirror({
    /**
     * The initial value of the editor
     */
    value: props.defaultValue,
    /**
     * Fired whenever the editor code value changes.
     */
    onValueChange: (value) => {
      console.log("value changed", value);
      props.onValueChange(value);
    },
  });
  const extensions = (): Extension => {
    return [lineNumbers(), highlightActiveLineGutter(), liquid(), material];
  };

  createEffect(on(extensions, (extensions) => reconfigure(extensions)));

  const reconfigure = createExtension(extensions());
  return (
    <div
      class="h-full w-full"
      ref={(el) => {
        onMount(() => {
          editorRef(el);
        });
      }}
    />
  );
};

import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoFocusPlugin } from "./plugins/AutoFocusPlugin";
import OnchangePlugin from "./plugins/OnChangePlugin";

type Props = {
  name: string;
  content: string;
  id: number;
  notebookId?: number;
};

export const Editor = ({ name, content, id, notebookId }: Props) => {
  const initialConfig: InitialConfigType = {
    namespace: "Editor",
    onError: (e: Error) => console.error(e),
    editorState: content,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={
          <ContentEditable className="h-full focus:outline-none" />
        }
        placeholder={
          <div className="text-primary/50 absolute top-10 ">
            텍스트를 입력하세요.
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnchangePlugin id={id} notebookId={notebookId} />
    </LexicalComposer>
  );
};

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, EditorState } from "lexical";
import useNoteStore from "@/store/useNoteStore";
import { Note } from "@/store/useNoteStore";

type Props = {
  id: number;
};

export default function OnchangePlugin({ id }: Props) {
  const { updateNote } = useNoteStore();
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      console.log(editorState);
      const content = JSON.stringify(editorState);
      const root = $getRoot();

      const newNote: Note = {
        id: id,
        title: "1",
        content: content,
        createdAt: new Date(),
        notebook: null,
      };

      updateNote(id, newNote);
    });
  };

  return <OnChangePlugin onChange={onChange} />;
}

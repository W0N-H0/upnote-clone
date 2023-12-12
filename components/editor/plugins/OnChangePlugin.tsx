import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, EditorState } from "lexical";
import useNoteStore from "@/store/useNoteStore";
import useNotebookStore from "@/store/useNotebookStore";
import { Note } from "@/store/useNoteStore";
import { Notebook } from "@/store/useNotebookStore";
import { debounce } from "@/utils/debounce";

type Props = {
  id: number;
  notebookId?: number;
};

export default function OnchangePlugin({ id, notebookId }: Props) {
  const { updateNote } = useNoteStore();
  const { notebooks, updateNotebook } = useNotebookStore();
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const content = JSON.stringify(editorState);
      const root = $getRoot();

      // content 값을 파싱하여 JavaScript 객체로 변환
      const parsedContent = JSON.parse(content);

      // 각 텍스트 노드의 텍스트 값을 추출하여 배열로
      const lines = parsedContent.root.children[0].children.map(
        (child: any) => child.text
      );

      // 첫 번째 줄을 제목으로, 나머지 줄을 본문으로 사용
      const title = lines[0];
      const body = lines.slice(1).join(" ");

      const newNote: Note = {
        id: id,
        title: title,
        body: body,
        content: content,
        createdAt: new Date(),
        notebook: notebookId ? notebookId : null,
      };

      updateNote(id, newNote);

      // 노트가 속한 노트북의 notes를 업데이트
      if (notebookId !== undefined) {
        const targetNotebookIndex = notebooks.findIndex(
          (notebook) => notebook.id === notebookId
        );
        if (targetNotebookIndex !== -1) {
          const updatedNotebook: Notebook = {
            ...notebooks[targetNotebookIndex],
            notes: notebooks[targetNotebookIndex].notes.map((note) =>
              note.id === id ? newNote : note
            ),
          };
          updateNotebook(targetNotebookIndex, updatedNotebook);
        }
      }
    });
  };

  // debounce 적용
  const debouncedOnChange = debounce(onChange, 500);

  return <OnChangePlugin onChange={debouncedOnChange} />;
}

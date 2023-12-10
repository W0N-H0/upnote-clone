import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, EditorState } from "lexical";
import useNoteStore from "@/store/useNoteStore";
import { Note } from "@/store/useNoteStore";
import { debounce } from "@/utils/debounce";

type Props = {
  id: number;
};

export default function OnchangePlugin({ id }: Props) {
  const { updateNote } = useNoteStore();
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
        notebook: null,
      };

      updateNote(id, newNote);
    });
  };

  // debounce 적용
  const debouncedOnChange = debounce(onChange, 500);

  return <OnChangePlugin onChange={debouncedOnChange} />;
}

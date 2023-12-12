"use client";
import { useParams } from "next/navigation";
import { Editor } from "@/components/editor/Editor";
import useNoteStore from "@/store/useNoteStore";

const NoteDetails: React.FC = () => {
  const { notes } = useNoteStore();
  const { id } = useParams();

  // ID 값을 사용하여 notes에서 해당하는 노트를 찾기
  const note = notes.find((note) => note.id === Number(id));

  // 해당하는 노트가 없는 경우 에러 메시지를 표시
  if (!note) {
    return <div className="px-24 py-10">해당하는 노트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="relative w-[1000px] h-full px-24 py-10">
      <Editor
        content={note.content}
        name={note.title}
        key={note.id}
        id={note.id}
        notebookId={note.notebook ? note.notebook : undefined}
      />
    </div>
  );
};

export default NoteDetails;

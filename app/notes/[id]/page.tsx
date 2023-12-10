"use client";
import { useParams } from "next/navigation";
import { Editor } from "@/components/editor/Editor";
import useNoteStore from "@/store/useNoteStore";

const NoteDetails: React.FC = () => {
  const { notes } = useNoteStore();
  const { id } = useParams();

  // ID 값을 사용하여 notes에서 해당하는 노트를 찾습니다.
  const note = notes.find((note) => note.id === Number(id));

  // 해당하는 노트가 없는 경우 에러 메시지를 표시하도록 합니다.
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
      />
    </div>
  );
};

export default NoteDetails;

"use client";
import { Editor } from "@/components/editor/Editor";
import useNoteStore from "@/store/useNoteStore";

const Notes: React.FC = () => {
  const { notes } = useNoteStore();
  return (
    <div className="relative w-[1000px] h-full px-24 py-10">
      {/* 초기 렌더링 시 id가 1인 note 렌더링*/}
      <Editor
        content={notes[0].content}
        name={notes[0].title}
        key={notes[0].id}
        id={notes[0].id}
      ></Editor>
    </div>
  );
};

export default Notes;

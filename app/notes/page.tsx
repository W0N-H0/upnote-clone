"use client";
import { Editor } from "@/components/editor/Editor";
import useNoteStore from "@/store/useNoteStore";

const Notes: React.FC = () => {
  const { notes } = useNoteStore();

  // notes[0]의 note가 notebook에 속할 경우 notebookId를 editor props로 전달 (전달안하면 노트 update시 notebook값이 null로 바뀌어 notes와 notebooks의 notes의 연동이 안됨)
  const notebookId = notes[0].notebook;

  return (
    <div className="relative w-[1000px] h-full px-24 py-10">
      {/* 초기 렌더링 시 첫번째 note 렌더링*/}
      <Editor
        content={notes[0].content}
        name={notes[0].title}
        key={notes[0].id}
        id={notes[0].id}
        notebookId={notebookId ? notebookId : undefined}
      ></Editor>
    </div>
  );
};

export default Notes;

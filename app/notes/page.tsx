"use client";
import { Editor } from "@/components/editor/Editor";
import useNoteStore from "@/store/useNoteStore";

const Notes: React.FC = () => {
  const { notes } = useNoteStore();

  const notebookId = notes[0].notebook;

  return (
    <div className="relative w-[1000px] h-full px-24 py-10">
      {/* 초기 렌더링 시 첫번째 note 렌더링*/}
      {notes && (
        <Editor
          content={notes[0].content}
          name={notes[0].title}
          key={notes[0].id}
          id={notes[0].id}
          notebookId={notebookId ? notebookId : undefined}
        />
      )}
    </div>
  );
};

export default Notes;

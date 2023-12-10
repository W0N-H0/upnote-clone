import React from "react";
import { Editor } from "@/components/editor/Editor";
import useNoteStore from "@/store/useNoteStore";

const NoteDetails: React.FC = () => {
  const { notes } = useNoteStore();

  return (
    <div className="relative w-[1000px] h-full px-24 py-10">
      <Editor
        content={notes[0].content}
        name={notes[0].title}
        key={1}
        id={notes[0].id}
      ></Editor>
    </div>
  );
};

export default NoteDetails;

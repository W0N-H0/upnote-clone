"use client";
import useNotebookStore from "@/store/useNotebookStore";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Editor } from "@/components/editor/Editor";
import EmptyPage from "./_components/EmptyPage";

const NoteList = dynamic(() => import("@/components/common/NoteList"), {
  ssr: false,
});

const Notebooks: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { notebooks } = useNotebookStore();
  const [isEmptyPage, setIsEmptyPage] = useState<Boolean>(true);

  useEffect(() => {
    if (notebooks.length >= 1) {
      setIsEmptyPage(false);
    } else {
      setIsEmptyPage(true);
    }
  }, [notebooks]);

  return (
    <div className="flex w-full">
      {isEmptyPage ? (
        <EmptyPage />
      ) : (
        <>
          {/* <NoteList data={notebooks} /> */}

          {children}
        </>
      )}
    </div>
  );
};

export default Notebooks;

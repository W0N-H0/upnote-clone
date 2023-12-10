"use client";
import useNoteStore from "@/store/useNoteStore";
import dynamic from "next/dynamic";
import EmptyPage from "./_components/EmptyPage";
import NoteDetails from "./_components/NoteDetails";
import { useState, useEffect } from "react";

const NoteList = dynamic(() => import("@/components/common/NoteList"), {
  ssr: false,
});

const Notes: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { notes } = useNoteStore();
  const [isEmptyPage, setIsEmptyPage] = useState<Boolean>(true);

  useEffect(() => {
    if (notes.length >= 1) {
      setIsEmptyPage(false);
    } else {
      setIsEmptyPage(true);
    }
  }, [notes]);

  return (
    <div className="flex">
      {isEmptyPage ? (
        <EmptyPage />
      ) : (
        <>
          <NoteList data={notes} />
          {/* <NoteDetails /> */}
          {children}
        </>
      )}
    </div>
  );
};

export default Notes;

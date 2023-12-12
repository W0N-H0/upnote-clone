"use client";

import React, { useState, useEffect } from "react";
import { Note } from "@/store/useNoteStore";
import { Notebook } from "@/store/useNotebookStore";
import { useRouter, usePathname } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import useNoteStore from "@/store/useNoteStore";
import useNotebookStore from "@/store/useNotebookStore";
import { useParams } from "next/navigation";
import { BsTrash3 } from "react-icons/bs";
import toast from "react-hot-toast";
import Button from "./Button";

interface NoteListProps {
  data: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ data }) => {
  const { notebooks, updateNotebook } = useNotebookStore();
  const [isNotePage, setIsNotePage] = useState<Boolean>(false);
  const { deleteNote } = useNoteStore();
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const noteId = Number(id);

  // params의 id값으로 notebook의 name추출을 위한 변수

  const matchingNotebook = notebooks.find((notebook) => notebook.id === noteId);

  // notes 페이지인지, notebooks 페이지인지 판별하는 useEffect
  useEffect(() => {
    if (pathname.includes("notes")) {
      setIsNotePage(true);
    } else {
      setIsNotePage(false);
    }
  }, [pathname]);

  // 날짜를 기준으로 최신순으로 정렬
  const sortedData = data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // 노트를 클릭했을 때의 동작을 정의
  const handleNoteClick = (id: number) => {
    if (isNotePage) {
      router.push(`/notes/${id}`); // 클릭한 노트의 ID를 사용하여 해당 노트의 페이지로 이동
    } else {
      router.push(`${pathname}/${id}`);
    }
  };

  // 삭제 버튼 클릭시 핸들러함수 (노트삭제 + 노트북 내 노트 삭제)
  const handleDeleteNote = async (noteId: number) => {
    const shouldDelete = window.confirm("정말 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        // notes에서 노트 삭제
        await deleteNote(noteId);

        // notebooks에서 노트 삭제
        const notebookIndex = notebooks.findIndex((notebook) =>
          notebook.notes.some((note) => note.id === noteId)
        );
        if (notebookIndex === -1) {
          console.error("Cannot find the notebook to delete note.");
          return;
        }
        const updatedNotebook: Notebook = {
          ...notebooks[notebookIndex],
          notes: notebooks[notebookIndex].notes.filter(
            (note) => note.id !== noteId
          ),
        };
        updateNotebook(notebookIndex, updatedNotebook);

        toast.success("삭제되었습니다.");
        if (isNotePage) {
          router.push("/notes");
        } else {
          router.push(`${pathname}`);
        }
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
      }
    }
  };

  console.log(sortedData);
  return (
    <div className="flex flex-col w-[310px] h-full border-border border-r-[1px] font-light">
      <div className="flex items-center h-[40px] px-5 bg-primary/5 border-border/90 border-b-[1px]">
        {isNotePage ? "All Notes" : matchingNotebook?.name}
      </div>

      <ul className="flex flex-col">
        {sortedData.map((note, index) => (
          <li
            key={index}
            className={`${note.id === noteId ? "bg-secondary/10" : ""}`}
            onClick={() => handleNoteClick(note.id)}
          >
            <div
              className={`flex flex-col px-6 justify-center mt-8 border-border border-b-[1px] pb-8 gap-2`}
            >
              <h2 className="font-semibold truncate overflow-ellipsis">
                {note.title || "New Note"}
              </h2>
              <p className="w-full text-primary/90 truncate overflow-ellipsis">
                {note.body || "No additional text"}
              </p>
              <p className="flex justify-between items-center text-primary/50 text-[0.85em]">
                {formatDate(note.createdAt)}
                {isNotePage ? (
                  <Button
                    className="text-primary"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <BsTrash3 size="15" />
                  </Button>
                ) : (
                  <Button
                    className="text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                  >
                    <BsTrash3 size="15" />
                  </Button>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;

"use client";

import React from "react";
import { Note } from "@/store/useNoteStore";
import { Notebook } from "@/store/useNotebookStore";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import useNoteStore from "@/store/useNoteStore";
import { useParams } from "next/navigation";
import { BsTrash3 } from "react-icons/bs";
import toast from "react-hot-toast";
import Button from "./Button";

interface NoteListProps {
  data: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ data }) => {
  const { deleteNote } = useNoteStore();
  const router = useRouter();
  const { id } = useParams();
  const noteId = Number(id);

  // 노트를 클릭했을 때의 동작을 정의
  const handleNoteClick = (id: number) => {
    router.push(`/notes/${id}`); // 클릭한 노트의 ID를 사용하여 해당 노트의 페이지로 이동
  };

  // 삭제 버튼 클릭시 핸들러함수
  const handleDeleteNote = async (id: number) => {
    const shouldDelete = window.confirm("정말 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        await deleteNote(id);
        toast.success("삭제되었습니다.");
        router.push("/notes");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        // 오류 처리 로직 추가
      }
    }
  };

  return (
    <div className="flex flex-col w-[310px] border-border border-r-[1px] font-light">
      <div className="flex items-center h-[40px] px-5 bg-primary/5 border-border/90 border-b-[1px]">
        All Notes
      </div>

      <ul className="flex flex-col">
        {data.map((note, index) => (
          <li
            key={index}
            className={`${index === noteId - 1 ? "bg-secondary/10" : ""}`}
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
                <Button
                  className="text-primary"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <BsTrash3 size="15" />
                </Button>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;

"use client";

import React from "react";
import { Note } from "@/store/useNoteStore";
import { useRouter } from "next/navigation";

interface NoteListProps {
  data: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ data }) => {
  const router = useRouter();
  // 노트를 클릭했을 때의 동작을 정의
  const handleNoteClick = (id: number) => {
    router.push(`/notes/${id}`); // 클릭한 노트의 ID를 사용하여 해당 노트의 페이지로 이동
  };

  return (
    <div className="flex flex-col w-[310px] border-border border-r-[1px] font-light ">
      <div className="flex items-center h-[40px] px-5 bg-primary/5">
        All Notes
      </div>
      <div className="px-5">
        <ul className="flex flex-col">
          {data.map((note, index) => (
            <li
              key={index}
              className="h-[100px] flex flex-col justify-center mt-12 border-border border-b-[1px] pb-12"
              onClick={() => handleNoteClick(note.id)} // onClick 이벤트를 추가하고, 클릭 시 handleNoteClick 함수를 실행
            >
              <span>{note.title}</span>
              <span>{note.content}</span>
              <span>{note.createdAt.toString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoteList;

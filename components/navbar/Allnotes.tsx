"use client";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../common/Button";
import useNoteStore, { Note } from "@/store/useNoteStore";

const Allnotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchNotes = () => {
    const storedNotes = localStorage.getItem("notes");
    const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
    setNotes(parsedNotes);
  };

  useEffect(() => {
    fetchNotes();
  }, [notes]);

  const toggleNotesVisibility = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center">
      <Button className="m-0 p-0 w-[25px]" onClick={toggleNotesVisibility}>
        {isOpen ? (
          <MdKeyboardArrowDown color="gray" size="20" />
        ) : (
          <MdKeyboardArrowRight color="gray" size="20" />
        )}
      </Button>
      <div className="ml-2">ALL notes</div>
      {/* notes 렌더링 */}
      {isOpen && (
        <ul className="flex">
          {notes.map((note, index) => (
            <li key={index}>
              {note.title} - {note.content} - {note.createdAt.toString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Allnotes;

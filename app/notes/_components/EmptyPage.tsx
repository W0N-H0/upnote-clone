"use client";
import Button from "@/components/common/Button";
import useNoteStore from "@/store/useNoteStore";
import Image from "next/image";
import blob from "@/public/assets/blob.png";
import { Note } from "@/store/useNoteStore";
import { generateUniqueNoteId } from "@/utils/idGenerator";

const EmptyPage: React.FC = () => {
  const { addNote, notes } = useNoteStore();

  const handleAddNote = () => {
    const newNote: Note = {
      id: generateUniqueNoteId(notes),
      title: "New Note",
      body: "No additional text",
      content: `{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}`,
      createdAt: new Date(),
      notebook: null,
    };
    addNote(newNote);
  };

  return (
    <div className="flex flex-col w-screen h-full justify-center items-center">
      <Image
        src={blob}
        alt="blob image"
        width={100}
        height={100}
        quality={100}
      ></Image>
      <span className="text-primary/70">
        Have a thought to jot down? Tap on the button below.
      </span>
      <Button
        className="bg-transparant text-secondary font-semibold"
        onClick={handleAddNote}
      >
        New Note
      </Button>
    </div>
  );
};

export default EmptyPage;

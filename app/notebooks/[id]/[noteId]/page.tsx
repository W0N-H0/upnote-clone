"use client";
import { useParams } from "next/navigation";
import { Editor } from "@/components/editor/Editor";
import useNotebookStore from "@/store/useNotebookStore";
import useNoteStore from "@/store/useNoteStore";
import { getCoverImageUrl } from "@/utils/getCoverImageUrl";
import { Note } from "@/store/useNoteStore";
import { generateUniqueNoteId } from "@/utils/idGenerator";
import { Notebook } from "@/store/useNotebookStore";
import dynamic from "next/dynamic";

const NoteList = dynamic(() => import("@/components/common/NoteList"), {
  ssr: false,
});

const NotebookInNoteDetails: React.FC = () => {
  const { notebooks, updateNotebook } = useNotebookStore();
  const { notes, addNote } = useNoteStore();
  const { id, noteId } = useParams(); // id는 notebook id, noteId는 note id

  // id와 일치하는 노트북 찾기
  const targetNotebookIndex = notebooks.findIndex(
    (notebook) => notebook.id === Number(id)
  );

  // noteId와 일치하는 노트 찾기
  const targetNoteIndex = notebooks[targetNotebookIndex].notes.findIndex(
    (note) => note.id === Number(noteId)
  );

  const handleAddNote = () => {
    const newNote: Note = {
      id: generateUniqueNoteId(notes),
      title: "New Note",
      body: "No additional text",
      content: `{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}`,
      createdAt: new Date(),
      notebook: Number(noteId),
    };
    // 노트북의 id값과 함께 노트 추가
    addNote(newNote);

    // 해당 노트북에도 노트를 추가
    if (targetNotebookIndex !== -1) {
      const updatedNotebook: Notebook = {
        ...notebooks[targetNotebookIndex],
        notes: [...notebooks[targetNotebookIndex].notes, newNote],
      };

      // 노트북을 업데이트
      updateNotebook(targetNotebookIndex, updatedNotebook);
    }
  };
  return (
    <div className="flex min-w-[1400px] max-w-[1920px] h-full">
      {notebooks[targetNotebookIndex].notes && (
        <NoteList
          data={notebooks[targetNotebookIndex].notes}
          isNotebookDetailPage={true}
        />
      )}
      <div className="relative w-[1000px] h-full px-24 py-10">
        {notebooks[targetNotebookIndex].notes[targetNoteIndex] &&
          notebooks[targetNotebookIndex].notes.length >= 1 && (
            <Editor
              content={
                notebooks[targetNotebookIndex].notes[targetNoteIndex].content
              }
              name={notebooks[targetNotebookIndex].notes[targetNoteIndex].title}
              key={notebooks[targetNotebookIndex].notes[targetNoteIndex].id}
              id={notebooks[targetNotebookIndex].notes[targetNoteIndex].id}
              notebookId={notebooks[targetNotebookIndex].id}
            />
          )}
      </div>
    </div>
  );
};

export default NotebookInNoteDetails;

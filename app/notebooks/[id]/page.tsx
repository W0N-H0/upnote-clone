"use client";
import { useParams } from "next/navigation";
import { Editor } from "@/components/editor/Editor";
import useNotebookStore from "@/store/useNotebookStore";
import useNoteStore from "@/store/useNoteStore";
import Button from "@/components/common/Button";
import Image from "next/image";
import { getCoverImageUrl } from "@/utils/getCoverImageUrl";
import { Note } from "@/store/useNoteStore";
import { generateUniqueNoteId } from "@/utils/idGenerator";
import { Notebook } from "@/store/useNotebookStore";
import dynamic from "next/dynamic";

const NoteList = dynamic(() => import("@/components/common/NoteList"), {
  ssr: false,
});

const NotebookDetails: React.FC = () => {
  const { notebooks, updateNotebook } = useNotebookStore();
  const { notes, addNote } = useNoteStore();
  const { id } = useParams();

  // id와 일치하는 노트북 찾기
  const targetNotebookIndex = notebooks.findIndex(
    (notebook) => notebook.id === Number(id)
  );
  const handleAddNote = () => {
    const newNote: Note = {
      id: generateUniqueNoteId(notes),
      title: "New Note",
      body: "No additional text",
      content: `{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}`,
      createdAt: new Date(),
      notebook: Number(id),
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
      <div onClick={handleAddNote}>test</div>
      {notebooks[targetNotebookIndex].notes && (
        <NoteList data={notebooks[targetNotebookIndex].notes} />
      )}
      <div className="relative w-[1000px] h-full px-24 py-10">
        {notebooks[targetNotebookIndex].notes && (
          <Editor
            content={notebooks[targetNotebookIndex].notes[0].content}
            name={notebooks[targetNotebookIndex].notes[0].title}
            key={notebooks[targetNotebookIndex].notes[0].id}
            id={notebooks[targetNotebookIndex].notes[0].id}
            notebookId={notebooks[targetNotebookIndex].id}
          />
        )}

        {/* 노트북안에 notes가 없는 경우 */}
        {targetNotebookIndex !== -1 &&
          notebooks[targetNotebookIndex].notes.length === 0 && (
            <div className="flex flex-col w-full h-full justify-center items-center">
              <Image
                src={getCoverImageUrl(
                  notebooks[targetNotebookIndex].imageIndex
                )}
                width={120}
                height={120}
                alt={notebooks[targetNotebookIndex].name}
                className="rounded-md mb-6"
              />
              <h2>Have a thought to jot down? Tap on the button below.</h2>
              <Button
                className="bg-transparant text-secondary font-semibold"
                onClick={handleAddNote}
              >
                New Note
              </Button>
            </div>
          )}
        {/* 존재하지 않는 notebook id 앤드포인트로 접속할 경우 */}
        {targetNotebookIndex === -1 ? (
          <div> 존재하지 않는 notebook 입니다.</div>
        ) : null}
      </div>
    </div>
  );
};

export default NotebookDetails;

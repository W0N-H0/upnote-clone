import { Note } from "@/store/useNoteStore";

export const generateUniqueNoteId = (notes: Note[]): number => {
  // 존재하는 notes중 max id값 찾기
  const maxId = Math.max(...notes.map((note) => note.id), 0);
  // max id + 1 값을 새로운 id로 부여
  return maxId + 1;
};

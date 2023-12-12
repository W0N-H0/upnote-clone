import { create } from "zustand";

export interface Note {
  id: number;
  title: string;
  body: string;
  content: string;
  createdAt: Date;
  notebook: number | null; // 별도의 notebook에 속하지 않으면 null = uncatagorized
}

interface NoteStore {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: number, updatedNote: Note) => void;
  deleteNote: (id: number) => void;
}

const localStorageKey = "notes";

const useNoteStore = create<NoteStore>((set) => {
  // 로컬스토리지에서 데이터 불러오기
  const storedNotes =
    typeof window !== "undefined"
      ? localStorage.getItem(localStorageKey)
      : null;
  const initialNotes = storedNotes ? JSON.parse(storedNotes) : [];

  return {
    notes: initialNotes,
    addNote: (note) =>
      set((state) => {
        const newNotes = [
          ...state.notes,
          { ...note, id: state.notes.length + 1 },
        ];
        // 로컬스토리지에 저장
        localStorage.setItem(localStorageKey, JSON.stringify(newNotes));
        return { notes: newNotes };
      }),
    updateNote: (id, updatedNote) =>
      set((state) => {
        const newNotes = state.notes.map((note) =>
          note.id === id ? { ...note, ...updatedNote } : note
        );
        // 로컬스토리지에 저장
        localStorage.setItem(localStorageKey, JSON.stringify(newNotes));
        return { notes: newNotes };
      }),
    deleteNote: (id) =>
      set((state) => {
        const newNotes = state.notes.filter((note) => note.id !== id);
        // 로컬스토리지에 저장
        localStorage.setItem(localStorageKey, JSON.stringify(newNotes));
        return { notes: newNotes };
      }),
  };
});

export default useNoteStore;

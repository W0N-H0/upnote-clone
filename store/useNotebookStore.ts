import { create } from "zustand";
import { Note } from "./useNoteStore";

// Notebook 인터페이스 선언
interface Notebook {
  id: number;
  name: string;
  imageIndex: number;
  notes: Note[];
}

// NotebookStore 인터페이스 선언
interface NotebookStore {
  notebooks: Notebook[];
  addNotebook: (notebook: Notebook) => void;
  updateNotebook: (index: number, updatedNotebook: Notebook) => void;
  deleteNotebook: (index: number) => void;
}

// NotebookStore 초기 상태 및 로컬스토리지 키
const localStorageKey = "notebooks";

const useNotebookStore = create<NotebookStore>((set) => {
  // 로컬스토리지에서 데이터 불러오기
  const storedNotebooks =
    typeof window !== "undefined"
      ? localStorage.getItem(localStorageKey)
      : null;
  const initialNotebooks = storedNotebooks ? JSON.parse(storedNotebooks) : [];

  return {
    notebooks: initialNotebooks,
    addNotebook: (notebook) =>
      set((state) => {
        const newNotebooks = [...state.notebooks, notebook];
        // 로컬스토리지에 저장
        localStorage.setItem(localStorageKey, JSON.stringify(newNotebooks));
        return { notebooks: newNotebooks };
      }),
    updateNotebook: (index, updatedNotebook) =>
      set((state) => {
        const newNotebooks = [...state.notebooks];
        newNotebooks[index] = updatedNotebook;
        // 로컬스토리지에 저장
        localStorage.setItem(localStorageKey, JSON.stringify(newNotebooks));
        return { notebooks: newNotebooks };
      }),
    deleteNotebook: (index) =>
      set((state) => {
        const newNotebooks = state.notebooks.filter((_, i) => i !== index);
        // 로컬스토리지에 저장
        localStorage.setItem(localStorageKey, JSON.stringify(newNotebooks));
        return { notebooks: newNotebooks };
      }),
  };
});

export default useNotebookStore;

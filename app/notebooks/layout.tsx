"use client";
import useNotebookStore from "@/store/useNotebookStore";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Editor } from "@/components/editor/Editor";
import EmptyPage from "./_components/EmptyPage";
import Image from "next/image";
import loadingGif from "@/public/assets/loading.gif";

const NoteList = dynamic(() => import("@/components/common/NoteList"), {
  ssr: false,
});

const Notebooks: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { notebooks } = useNotebookStore();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isEmptyPage, setIsEmptyPage] = useState<Boolean>(false);

  useEffect(() => {
    // notebooks가 비동기적으로 불러와질 때 로딩 상태 표시
    setIsLoading(true);

    // notebooks가 로드된 후에 로딩 상태 갱신
    if (notebooks.length >= 1) {
      setIsEmptyPage(false);
      setIsLoading(false);
    } else {
      setIsEmptyPage(true);
      setIsLoading(false);
    }
  }, [notebooks]);

  return (
    <>
      {isLoading ? (
        // 로딩 중인 경우 로딩 UI 표시
        <div className="flex w-full h-screen justify-center items-center">
          <Image src={loadingGif} width={100} height={100} alt="loading gif" />
        </div>
      ) : isEmptyPage ? (
        // 로딩이 완료되었지만 notebooks가 비어있는 경우
        <EmptyPage />
      ) : (
        // notebooks가 정상적으로 불러와진 경우
        <>
          {/* <NoteList data={notebooks} /> */}
          {children}
        </>
      )}
    </>
  );
};

export default Notebooks;

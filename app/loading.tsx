import Image from "next/image";
import loadingGif from "@/public/assets/loading.gif";

const Loading: React.FC = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Image src={loadingGif} width={100} height={100} alt="loading gif" />
    </div>
  );
};

export default Loading;

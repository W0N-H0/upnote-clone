import Image from "next/image";
import welcome from "@/public/assets/welcome.png";
export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center pb-40 gap-4">
      <Image
        src={welcome}
        alt="welecome img"
        width={500}
        height={500}
        quality={100}
      />
      <h1 className="font-bold text-[1.4em]">Welecome to UpNote</h1>
      <p> Stay focused and productive with a clean note space.</p>
    </main>
  );
}

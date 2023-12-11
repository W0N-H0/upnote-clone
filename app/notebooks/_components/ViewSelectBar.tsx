"use client";
import { MdMenu } from "react-icons/md";
import { PiSquaresFour } from "react-icons/pi";

interface ViewSelectBarProps {
  handleViewSelectClick: (boolean: Boolean) => void;
  isFrameType: Boolean;
}

const ViewSelectBar: React.FC<ViewSelectBarProps> = ({
  handleViewSelectClick,
  isFrameType,
}) => {
  return (
    <div className="flex mx-4 items-center">
      <div
        className={`px-2 py-1 bg-background rounded-l-md cursor-pointer ${
          isFrameType && "bg-primary/40 text-background"
        }`}
        onClick={() => handleViewSelectClick(true)}
      >
        <PiSquaresFour size={25} />
      </div>
      <div
        className={`px-2 py-1 bg-background rounded-r-md cursor-pointer ${
          !isFrameType && "bg-primary/40 text-background"
        } `}
        onClick={() => handleViewSelectClick(false)}
      >
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default ViewSelectBar;

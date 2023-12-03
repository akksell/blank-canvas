import RelatedImagesContainer from "./RelatedImage";

const Stagelight = ({ images }) => {
  return (
    <div className="w-full absolute">
      <div className="flex justify-center">
        <div className="absolute z-40 rotate-12 -translate-x-52 -translate-y-24 top-0 w-24 h-128 bg-slate-950" />
        <div className="absolute z-40 -rotate-12 translate-x-52 -translate-y-24 top-0 w-24 h-128 bg-slate-950" />
        <div className="absolute z-30 h-96 w-96 opacity-40 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Stagelight;
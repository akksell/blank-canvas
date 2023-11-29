import { RelatedImageContainer } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const ResultPage = ({ relatedImages, goBack }) => {
  return (
    <div className="w-full h-full bg-slate-950 justify-center">
      <div className='h-32 flex justify-around'>
        <div className="flex text-slate-950 items-center">
          <button onClick={() => goBack()} className="rounded bg-gray-50 px-2 py-2">
            <FontAwesomeIcon icon={faRotateRight} className="mr-2" />
            Regenerate
          </button>
        </div>
        <img src="stagelights.png" alt="Stagelighting" className="h-full" />
        <div className="opacity-0">
          <button onClick={() => {}} className="hover:cursor-pointer">
            <FontAwesomeIcon icon={faRotateRight} />
            Regenerate
          </button>
        </div>
      </div>
      <RelatedImageContainer images={relatedImages} />
    </div>
  );
}

export default ResultPage;
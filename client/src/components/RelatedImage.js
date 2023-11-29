'use client';

import { ImageViewer } from "react-image-viewer-dv";
import { Carousel } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Stagelight from "./Stagelight";

const RelatedImage = ({ path }) => {
  return (
    <div className="flex justify-center h-128">
      <Stagelight />
      <div className="bg-[url('/public/easel.png')] bg-no-repeat bg-contain h-full w-96 z-50">
        <div className="flex mt-32 justify-center">
          <img src={path} className="w-44 h-44" alt="..." />
        </div>
      </div>
    </div>
  );
}

const Control = ({ isLeft }) => {
  const icon = isLeft ? faChevronLeft : faChevronRight;

  return (
    <div className={`${isLeft ? '' : ''} text-orange-300`}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

const RelatedImagesContainer = ({ images }) => {
  return (
    <div className="h-128 z-50">
      <Carousel slide={false} indicators={false} leftControl={<Control isLeft={true} />} rightControl={<Control />} >
        {images.map(image => <RelatedImage path={image.filename} />)}
      </Carousel>
    </div>
  );
}

export default RelatedImagesContainer;
import { ImageViewer } from "react-image-viewer-dv"
const RelatedImage = ({ path, score }) => {
  return (
    <div className="flex flex-col items-center justify-items-center">
      <div>
        <img src={path} />
      </div>
      <p>Cosine Similarity: {Number(score).toFixed(5) * 100}%</p>
    </div>
  );
}

const RelatedImagesContainer = ({ images }) => {
  return (
    // <div className="grid grid-cols-4 gap-4">
    //   {images.map(image => <RelatedImage path={image.filename} score={image.similarity} />)}
    // </div>
      <div className ="grid grid-cols-4 gap-4">
        {/* <img src={path}  alt="Your image" /> */}
        {images.map(image => <ImageViewer> <RelatedImage path={image.filename} score={image.similarity} /> </ImageViewer>)}
        
      </div>
  );
}

export default RelatedImagesContainer;
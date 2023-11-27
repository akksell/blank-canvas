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
    <div className="grid grid-cols-4 gap-4">
      {images.map(image => <RelatedImage path={image.filename} score={image.similarity} />)}
    </div>
  );
}

export default RelatedImagesContainer;
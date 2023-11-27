const RelatedImage = ({ path }) => {
  return (
    <div className="flex items-center justify-items-center">
      <img src={path} />
    </div>
  );
}

const RelatedImagesContainer = ({ images }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map(image => <RelatedImage path={image.filename} />)}
    </div>
  );
}

export default RelatedImagesContainer;
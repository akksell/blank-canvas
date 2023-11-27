import { useState, useEffect } from 'react';
import RelatedImageContainer from './RelatedImage';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const submitImage = async () => {
    if (!imageFile) {
      const error = {
        type: 'MISSING_FILE',
        message: 'Missing image file'
      };
      setErrors([ error ]);
      return;
    }

    const form = new FormData();
    form.append('file', imageFile);
    const response = await fetch('/query', {
      method: 'POST',
      body: form
    });
    const results = await response.json();
    setRelatedImages(results);
  }

  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
          <button onClick={() => submitImage()}>Submit</button>
        </div>

        {relatedImages.length > 0 && (
          <RelatedImageContainer images={relatedImages} />
        )}
      </div>
    </div>
  );
}

export default App;

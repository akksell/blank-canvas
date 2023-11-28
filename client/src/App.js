import { useState, useEffect } from 'react';
import RelatedImageContainer from './RelatedImage';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitImage = async () => {
    setLoading(true);
    if (!imageFile) {
      const error = {
        type: 'MISSING_FILE',
        message: 'Missing image file'
      };
      setErrors([ error ]);
      setLoading(false);
      return;
    }

    const form = new FormData();
    form.append('file', imageFile);
    const response = await fetch('/query', {
      method: 'POST',
      body: form
    });
    const results = await response.json();
    if (results?.errors) {
      setErrors(results.errors);
      setRelatedImages([]);
    } else {
      setErrors([]);
      setRelatedImages(results);
    }
    setLoading(false);
  }

  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
          <button onClick={() => submitImage()}>Submit</button>
        </div>

        {errors?.length > 0 && (
          <div className='flex flex-col items-center'>
            <div>
              {errors.map(err => <p className='text-red-400'>{err.message}</p>)}
            </div>
          </div>
        )}

        {loading && (
          <div className='flex flex-col items-center my-5'>
            <div className='w-12 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full flex justify-center items-center animate-spin'>
              <div className='rounded-full bg-white h-8 w-8'>
              </div>
            </div>
          </div>
        )}

        {relatedImages.length > 0 && (
          <RelatedImageContainer images={relatedImages} />
        )}
      </div>
    </div>
  );
}

export default App;

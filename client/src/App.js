import { useState } from 'react';
import { UploadPage, ResultPage } from './pages';

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

  if (relatedImages?.length > 0) {
    return (
      <>
        <ResultPage relatedImages={relatedImages} goBack={() => setRelatedImages([])} />
      </>
    );
  }

  return (
    <div className="App">
      <UploadPage loading={loading} errors={errors} setImageFile={setImageFile} submitImage={submitImage} />
    </div>
  );
}

export default App;
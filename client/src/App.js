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
  useEffect(() => {
    const images = [
      {
        "filename": "cartoon/train/mickey/mickey_399.png",
        "similarity": 1.0000000000000002
      },
      {
        "filename": "cartoon/train/donald/donald_583.jpg",
        "similarity": 0.8075900849505063
      },
      {
        "filename": "cartoon/train/donald/donald_288.png",
        "similarity": 0.8061031861823046
      },
      {
        "filename": "cartoon/train/pooh/pooh_187.jpg",
        "similarity": 0.8033464123626725
      },
      {
        "filename": "cartoon/train/pooh/pooh_9.jpg",
        "similarity": 0.8009186420962041
      },
      {
        "filename": "cartoon/train/mickey/mickey_286.png",
        "similarity": 0.8009031230644863
      },
      {
        "filename": "cartoon/train/donald/donald_97.png",
        "similarity": 0.8003076430468473
      },
      {
        "filename": "cartoon/train/pooh/pooh_478.png",
        "similarity": 0.7978573129270121
      },
      {
        "filename": "cartoon/train/pooh/pooh_189.jpg",
        "similarity": 0.796145438481768
      },
      {
        "filename": "cartoon/train/pooh/pooh_310.png",
        "similarity": 0.7960816351336674
      },
      {
        "filename": "cartoon/train/mickey/mickey_261.jpg",
        "similarity": 0.794638419638248
      },
      {
        "filename": "cartoon/train/mickey/mickey_136.png",
        "similarity": 0.7945661498981199
      },
      {
        "filename": "cartoon/train/mickey/mickey_69.jpg",
        "similarity": 0.7945276724789897
      },
      {
        "filename": "cartoon/train/donald/donald_374.gif",
        "similarity": 0.7937880976645386
      },
      {
        "filename": "cartoon/train/mickey/mickey_105.png",
        "similarity": 0.7935101721072068
      },
      {
        "filename": "cartoon/train/pooh/pooh_541.png",
        "similarity": 0.7934674612930268
      },
      {
        "filename": "cartoon/train/minion/minion_235.png",
        "similarity": 0.7933253344462521
      },
      {
        "filename": "cartoon/train/pooh/pooh_190.jpg",
        "similarity": 0.7929233903359331
      },
      {
        "filename": "cartoon/train/pooh/pooh_410.png",
        "similarity": 0.7919883746876787
      },
      {
        "filename": "cartoon/train/mickey/mickey_194.png",
        "similarity": 0.7917935971706208
      }
    ]    
    setRelatedImages(images)
  }, []);

  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
          <button onClick={() => submitImage()} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Submit</button>
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

/*

<div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
    </label>
</div> 
 */
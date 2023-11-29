
const UploadPage = ({ loading, errors, setImageFile, submitImage }) => {
  return (
    <div>
      <div class="grid grid-rows-4 grid-cols-1 items-center justify-center content-between pt-64 w-full bg-screen bg-center h-screen bg-[url('/public/header_canvas.jpg')] ">
        <div class="text-center">
            <h1 class="text-grey text-9xl font-fontTitle animate-change-font">Blank Canvas</h1>
        </div>
            
        <div class="flex items-center justify-center w-full">
          <label for="dropzone-file" class="flex flex-col items-center justify-center h-64 w-1/2 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-transparent m-3">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-12 h-12 mb-4 text-black-500 dark:text-black-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-xl text-black-500 dark:text-black-400"><span class="font-bold">Click to upload</span> or drag and drop</p>
                  <p class="text-lg text-black-500 dark:text-black-400">PNG, JPG or GIF</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" onChange={(e) => setImageFile(e.target.files[0])}/>
          </label>
        </div> 

        <div class="flex items-center justify-center">
          <button onClick={() => submitImage()} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-white-400 rounded shadow m-3 px-7 pb-2.5 pt-3 text-lg">
            Submit
          </button>
        </div>

      </div>

      <div className="container mx-auto">
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
      </div>
    </div>
  );
}

export default UploadPage;
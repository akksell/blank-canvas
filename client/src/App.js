import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/test');
      console.log(response);
      const dataRes = await response.json();
      setData(dataRes);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <p>Hello World! Testing Data Fetch...</p>
      <p>Result:</p>
      {data && (
        <>
          <p>Message: {data.message}</p>
          <p>Status: {data.status}</p>
        </>
      )}
    </div>
  );
}

export default App;

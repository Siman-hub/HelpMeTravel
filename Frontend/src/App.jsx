import { useState } from 'react'
import './App.css'

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState('')

  const handleSubmit = (e) => {
  e.preventDefault();

  // Construct URL with query parameters
  const url = new URL('http://localhost:8080/getRoute');
  url.searchParams.append('source', source);
  url.searchParams.append('destination', destination);

  fetch(url, {
    method: 'POST', // or 'GET' if backend supports it
  })
    .then((res) => res.text()) // because backend returns plain text
    .then((data) => {
      setResult(data);
    })
    .catch((err) => {
      console.error(err);
      setResult('Error contacting backend');
    });
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Route Finder</h2>

        <input
          type="text"
          placeholder="Location"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Submit
        </button>

        {result && (
          <p className="mt-4 text-green-700 font-semibold text-center">{result}</p>
        )}
      </form>
    </div>
  )
}

export default App

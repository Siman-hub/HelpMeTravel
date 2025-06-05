import { useEffect, useState } from 'react';

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShouldFetch(true);
  };

  useEffect(() => {
    if (!shouldFetch) return;

    const formData = new URLSearchParams();
    formData.append('source', source);
    formData.append('destination', destination);

    fetch('http://localhost:8080/getRoute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })
      .then((res) => res.text())
      .then((data) => {
        setResult(data);
        setShouldFetch(false);
      })
      .catch((err) => {
        console.error(err);
        setResult('Error contacting backend');
        setShouldFetch(false);
      });
  }, [shouldFetch, source, destination]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1600021385102-e3c0c626b178')",
      }}
    >
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white bg-opacity-80 shadow-md fixed top-0 left-0 z-50">
        <h1 className="text-2xl font-extrabold text-blue-800 tracking-wide">HELP ME TRAVEL</h1>
        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="#home" className="text-blue-700 hover:text-blue-900">Home</a>
          <a href="#destinations" className="text-blue-700 hover:text-blue-900">Destinations</a>
          <a href="#packages" className="text-blue-700 hover:text-blue-900">Packages</a>
          <a href="#contact" className="text-blue-700 hover:text-blue-900">Contact</a>
        </nav>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
          Login / Register
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 pt-36 pb-10 my-9">
        <div className="bg-gray-600 bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
          <h2 className="text-5xl font-bold text-blue-900 mb-2 tracking-wide">FIND YOUR ROUTE</h2>
          <p className="text-gray-700 mb-8">
            Smart Connections.Budget Friendly.No Direct Train.No Problem
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Enter your location"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg w-full transition"
            >
              Find My Adventure
            </button>
          </form>

          {result && (
            <div className="mt-6 text-green-700 font-medium border-t pt-4">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

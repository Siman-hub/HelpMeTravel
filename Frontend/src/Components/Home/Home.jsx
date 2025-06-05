import { useEffect, useState } from 'react';
function Home() {
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
    <div>
      <div className="relative z-10 pt-35 flex justify-center items-center">
        <h1 className="text-white/50 font-extrabold text-[20vw] md:text-[14rem] tracking-tight leading-none uppercase text-center">
          HELP ME
          <br />
          TRAVEL
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center px-4 pt-20 pb-10">
        <div className="bg-white/50 p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
          <h2 className="text-5xl font-bold text-white mb-2 tracking-wide">FIND YOUR ROUTE</h2>
          <p className="text-white mb-8">
            Smart Connections. Budget Friendly. No Direct Train? No Problem!
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Enter your location"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg w-full transition"
            >
              Find My Adventure
            </button>
          </form>

          <div className="mt-6 text-green-700 font-medium border-t pt-4">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

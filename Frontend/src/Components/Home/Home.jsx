import { useEffect, useState } from 'react';
import { MapPin, Route } from "lucide-react";
import Lottie from "lottie-react";
import Train from "../../assets/Train.json";


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
      {/* Heading + Lottie Animation */}
      <div className="relative z-10 pt-10 flex flex-col md:flex-row justify-center items-center gap-10 px-4">
      {/* Text Block */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg pt-50">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-2">
          HELP ME TRAVEL
        </h2>
        <h1 className="text-xl md:text-2xl italic text-gray-600">
          "Wander Often. Worry Never."
        </h1>
      </div>

      {/* Animation Block */}
      <div className="w-[300px] md:w-[400px] h-[300px] md:h-[400px]">
        <Lottie animationData={Train} loop={true} />
      </div>
    </div>

      {/* Form + Result Box */}
      <div className="flex flex-col items-center justify-center px-4 pt-20 pb-10">
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-2xl text-center text-black">
          <h2 className="text-5xl font-bold mb-2 tracking-wide">FIND YOUR ROUTE</h2>
          <p className="mb-8">
            Smart Connections. Budget Friendly. No Direct Train? No Problem!
          </p>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-1/2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full pl-12 p-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 text-black"
                  required
                />
              </div>

              <div className="relative w-full md:w-1/2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-12 p-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg w-full transition flex items-center justify-center gap-2"
            >
              <Route className="w-5 h-5" />
              Find My Adventure
            </button>
          </form>

          <div className="mt-6 text-green-700 font-medium pt-4">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

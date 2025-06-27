import { useEffect, useState } from 'react';
import { MapPin, Route } from "lucide-react";
import Lottie from "lottie-react";
import Train from "../../assets/Train.json";
import pic from '../images/pic2.jpg';

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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
      {/* Hero Section */}
      <div
        className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-8 px-4 pt-10 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${pic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl bg-white/70 p-6 rounded-xl shadow-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2 tracking-tight drop-shadow-md">
            HELP ME TRAVEL
          </h2>
          <h1 className="text-lg md:text-xl italic text-gray-700 font-medium">
            From Tracks to Treks — Your Journey Starts Here.
          </h1>
        </div>

        <div>
          <Lottie animationData={Train} loop={true} className="w-[500px] h-[400px]" />
        </div>
      </div>

      {/* 🌍 Our Services Section */}
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Our Services</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Everything you need for smooth, smart, and affordable travel — all in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Service 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow border border-transparent hover:border-blue-600 hover:shadow-blue-500/40 hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-blue-700 mb-2 text-center">Multi-Leg Routes</h3>
              <p className="text-gray-600">
                Can’t find a direct train? We'll help you break the journey smartly using multiple connections.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow border border-transparent hover:border-blue-600 hover:shadow-blue-500/40 hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-blue-700 mb-2 text-center">Fare Optimization</h3>
              <p className="text-gray-600">
                Get the most cost-effective route suggestions. Save more with our AI-based fare logic.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow border border-transparent hover:border-blue-600 hover:shadow-blue-500/40 hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-blue-700 mb-2 text-center">Realtime Suggestions</h3>
              <p className="text-gray-600">
                Whether you're booking early or last-minute, get recommendations that adapt to availability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📍 Adventure Form Section */}
      <div className="flex flex-col items-center justify-center px-4 pb-10 w-full">
        <div
          id="adventure"
          className="bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-2xl text-center text-black"
        >
          <h2 className="text-5xl font-bold mb-2 tracking-wide">FIND YOUR ROUTE</h2>
          <p className="mb-8">Smart Connections. Budget Friendly. No Direct Train? No Problem!</p>

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
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg w-full transition transform hover:scale-105 hover:shadow-lg duration-200 flex items-center justify-center gap-2"
            >
              <Route className="w-5 h-5" />
              Find My Adventure
            </button>
          </form>

          <div className="mt-6 text-blue-800 font-medium pt-4">{result}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;

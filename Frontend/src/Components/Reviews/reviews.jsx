import { useState, useEffect } from "react";

function Reviews() {
    const [location, setLocation] = useState('');
    const [data, setData] = useState([]);

    const Demo = [
        {
            user: "Satyam Das",
            review: "HelpMeTravel helped me plan the cheapest route for my Kolkata to Delhi trip by breaking the journey into two segments, saving over ₹800!"
        },
        {
            user: "Amit Verma",
            review: "The app’s alternative boarding suggestion helped me get a confirmed seat on a packed train without paying extra. Genius feature!"
        },
        {
            user: "Pooja Iyer",
            review: "I could easily check fare trends over the week, helping me plan my Goa trip within budget. The UI is clean and user-friendly."
        },
        {
            user: "Vikram Singh",
            review: "Community reviews helped me find budget-friendly food options near railway stations during my trip. Loved the practical tips."
        },
        {
            user: "Neha Patel",
            review: "I used HelpMeTravel to plan an offbeat Uttarakhand trip. The journey planner showed me hidden cheaper routes that other apps never suggested."
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Location submitted:", location);

        // Example: Fetch data when location is submitted (if needed)
        // fetch(`https://yourapi.com/search?location=${location}`)
        //     .then(res => res.json())
        //     .then(data => setData(data))
        //     .catch(err => console.error(err));
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div className="mb-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        className="border p-2 flex-1 rounded"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </form>
            </div>

            <div>
                {location === '' ? (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">User Reviews</h2>
                        {Demo.map((item, index) => (
                            <div key={index} className="border rounded p-3 mb-2 shadow-sm">
                                <h3 className="font-bold">{item.user}</h3>
                                <p>{item.review}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Showing results for: <strong>{location}</strong></p>
                )}
            </div>
        </div>
    );
}

export default Reviews;

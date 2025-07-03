import { useState, useEffect } from "react";
import { Search, Star, MessageCircle, User } from "lucide-react";
import { useUser } from "../../Context/UserContext";
import { Link } from "react-router-dom";

function Reviews() {
    const [location, setLocation] = useState('');
    const [data, setData] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [userReviews, setUserReviews] = useState([]);
    const {user} = useUser();

    const Demo = [
        { user: "Satyam Das", review: "HelpMeTravel helped me plan the cheapest route for my Kolkata to Delhi trip by breaking the journey into two segments, saving over ₹800!" },
        { user: "Amit Verma", review: "The app's alternative boarding suggestion helped me get a confirmed seat on a packed train without paying extra. Genius feature!" },
        { user: "Pooja Iyer", review: "I could easily check fare trends over the week, helping me plan my Goa trip within budget. The UI is clean and user-friendly." },
        { user: "Vikram Singh", review: "Community reviews helped me find budget-friendly food options near railway stations during my trip. Loved the practical tips." },
        { user: "Neha Patel", review: "I used HelpMeTravel to plan an offbeat Uttarakhand trip. The journey planner showed me hidden cheaper routes that other apps never suggested." }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Location submitted:", location);
        setShouldFetch(true);
    };

    useEffect(() => {
        if (!user) return;

        fetch(`http://localhost:8080/getUserReviews/${user.displayName}`)
        .then((res) => res.json())
        .then((data) => {
            setUserReviews(data);
        })
        .catch((err) => {
            console.error(err);
            setUserReviews([]);
        });
    }, [user]);

    useEffect(() => {
        if (!shouldFetch) return;

        fetch(`http://localhost:8080saveReview/${location}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setShouldFetch(false);
            })
            .catch((err) => {
                console.error(err);
                setData([]);
                setShouldFetch(false);
            });
    }, [shouldFetch, location]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8 flex gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-lg w-2/3">
                <div className="mb-6">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location"
                            className="border-2 border-blue-100 p-3 flex-1 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        />
                        <button 
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div>
                    {location === '' ? (
                        <div>
                            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                                <MessageCircle className="w-6 h-6" />
                                User Reviews
                            </h2>
                            {Demo.map((item, index) => (
                                <div key={index} className="border border-blue-100 rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-white">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {item.user.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-blue-900 text-lg mb-2">{item.user}</h3>
                                            <p className="text-gray-700 leading-relaxed">{item.review}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                <Search className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                <p className="text-blue-800 text-lg">
                                    Showing results for: <strong className="text-blue-900">{location}</strong>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg w-1/3">
                {user === null ? (
                    <div className="text-center py-8 px-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">Join the Community</h3>
                        <p className="text-blue-600 mb-4">Login to submit your own reviews.</p>
                        <Link to="/login">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium shadow-md hover:shadow-lg">
                                Login Now
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Your Submitted Reviews
                        </h2>
                        {userReviews.length === 0 ? (
                            <div className="text-center py-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <MessageCircle className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-blue-600 mb-4">You haven't submitted any reviews.</p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                                    Write Your First Review
                                </button>
                            </div>
                        ) : (
                            userReviews.map((item, index) => (
                                <div key={index} className="border border-blue-100 rounded-lg p-4 mb-3 shadow-sm bg-blue-50">
                                    <h3 className="font-bold text-blue-900 mb-1">{item.user}</h3>
                                    <p className="text-blue-700">{item.review}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Reviews;
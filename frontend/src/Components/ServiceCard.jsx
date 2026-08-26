import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ icon, title, description, rating }) {
  const navigate = useNavigate();
  const book = () => {
    if (!localStorage.getItem('token')) { navigate(`/login?redirect=${encodeURIComponent(`/booking?service=${title}`)}`); return; }
    navigate(`/booking?service=${encodeURIComponent(title)}`);
  };
  return <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-5xl">{icon}</div>
    <h2 className="text-2xl font-bold text-slate-800 mt-6">{title}</h2>
    <p className="text-gray-600 mt-4">{description}</p>
    <div className="flex justify-center mt-5"><span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-semibold">⭐ {rating}</span></div>
    <button onClick={book} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">Book Now</button>
  </div>;
}

import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { apiFetch } from '../lib_api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/api/services`)
      .then(r => r.json())
      .then(d => setServices(d.services || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return <section id="services" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">Our Services</span>
        <h1 className="text-5xl font-bold mt-6">Best Home <span className="text-blue-600">Services</span></h1>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Book trusted professionals for your home needs. Fast, reliable and affordable doorstep services.</p>
      </div>
      {loading ? <p className="text-center text-gray-500">Loading services...</p> :
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => <ServiceCard key={service.id} {...service} />)}
        </div>}
    </div>
  </section>;
}

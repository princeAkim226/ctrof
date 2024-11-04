'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Home: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [route, setRoute] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const images = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const cycleImages = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  React.useEffect(() => {
    const interval = setInterval(cycleImages, 3000);
    return () => clearInterval(interval);
  }, []);

  // Obtenir la date d'aujourd'hui au format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Réservation</h1>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col w-full max-w-md"
        >
          {step === 1 && (
            <div>
              <label htmlFor="name" className="mb-2 text-gray-700">Quel est votre nom ?</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition w-full"
              >
                Suivant
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-gray-700 mb-4">Bonjour {name}, quel est votre numéro de téléphone ?</p>
              <label htmlFor="phone" className="mb-2 text-gray-700">Numéro de téléphone :</label>
              <PhoneInput
                country={'bf'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputClass="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                containerStyle={{ width: '100%' }}
              />
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition w-full"
              >
                Suivant
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-gray-700 mb-4">Merci {name}. Pour quel trajet voulez-vous faire une réservation ?</p>
              <label htmlFor="route" className="mb-2 text-gray-700">Trajet :</label>
              <select
                id="route"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="" disabled>Choisissez un trajet</option>
                <option value="Ouaga - Bobo">Ouaga - Bobo</option>
                <option value="Ouaga - Boromo">Ouaga - Boromo</option>
                <option value="Bobo - Koudougou">Bobo - Koudougou</option>
                <option value="Koudougou - Ouaga">Koudougou - Ouaga</option>
              </select>
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition w-full"
              >
                Suivant
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-gray-700 mb-4">À quelle heure partez-vous, {name} ?</p>
              <label htmlFor="time" className="mb-2 text-gray-700">Heure :</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition w-full"
              >
                Suivant
              </button>
            </div>
          )}

          {step === 5 && (
            <div>
              <p className="text-gray-700 mb-4">Et enfin, quelle est la date de votre voyage, {name} ?</p>
              <label htmlFor="date" className="mb-2 text-gray-700">Date :</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today} // Limite la sélection de date aux jours futurs
                className="p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                onClick={() => alert(`Réservation effectuée pour ${name}!`)}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition w-full"
              >
                Réserver
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Image Carousel Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-gray-200">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Carousel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-lg shadow-lg max-h-full object-cover w-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default Home;

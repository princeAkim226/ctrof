'use client';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ReservationPage: React.FC = () => {
  const [typeReservation, setTypeReservation] = useState<'National' | 'International' | null>(null);
  const [tripType, setTripType] = useState<'AllerSimple' | 'AllerRetour' | null>(null);
  const [formData, setFormData] = useState({
    tel: '',
    nom: '',
    horaire: '',
    trajetAller: '',
    dateAller: '',
    trajetRetour: '',
    dateRetour: '',
    message: '',
  });
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const trajets = ['OUA-BBO', 'BBO-KMS', 'OUA-KDG']; // Liste des trajets disponibles

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      tel: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setConfirmationMessage("Votre réservation a été soumise avec succès !");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">Réservation</h1>

      {/* Choix National ou International */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto">
        <button
          onClick={() => setTypeReservation(typeReservation === 'National' ? null : 'National')}
          className={`px-4 py-2 rounded-lg font-medium ${
            typeReservation === 'National' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          National
        </button>
        <button
          onClick={() => setTypeReservation(typeReservation === 'International' ? null : 'International')}
          className={`px-4 py-2 rounded-lg font-medium ${
            typeReservation === 'International' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          International
        </button>
      </div>

      {/* Choix Aller Simple ou Aller-Retour */}
      {typeReservation && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto">
          <button
            onClick={() => setTripType(tripType === 'AllerSimple' ? null : 'AllerSimple')}
            className={`px-4 py-2 rounded-lg font-medium ${
              tripType === 'AllerSimple' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Aller Simple
          </button>
          <button
            onClick={() => setTripType(tripType === 'AllerRetour' ? null : 'AllerRetour')}
            className={`px-4 py-2 rounded-lg font-medium ${
              tripType === 'AllerRetour' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Aller-Retour
          </button>
        </div>
      )}

      {/* Formulaire */}
      {typeReservation && tripType && (
        <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Téléphone:</label>
            <PhoneInput
              country={'fr'}
              value={formData.tel}
              onChange={handlePhoneChange}
              inputClass="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              dropdownClass="bg-white border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nom complet:</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Horaire:</label>
            <select
              name="horaire"
              value={formData.horaire}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Sélectionnez</option>
              <option value="6H15">6H15</option>
              <option value="7H15">7H15</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Trajet Aller:</label>
            <select
              name="trajetAller"
              value={formData.trajetAller}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Sélectionnez un trajet</option>
              {trajets.map(trajet => (
                <option key={trajet} value={trajet}>{trajet}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Date Aller:</label>
            <input
              type="date"
              name="dateAller"
              value={formData.dateAller}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Champs spécifiques pour Aller-Retour */}
          {tripType === 'AllerRetour' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Trajet Retour:</label>
                <select
                  name="trajetRetour"
                  value={formData.trajetRetour}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Sélectionnez un trajet</option>
                  {trajets.map(trajet => (
                    <option key={trajet} value={trajet}>{trajet}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Date Retour:</label>
                <input
                  type="date"
                  name="dateRetour"
                  value={formData.dateRetour}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* Champ pour le message */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows={3}
              placeholder="Entrez votre message ici..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Réserver
          </button>
        </form>
      )}

      {/* Message de confirmation */}
      {confirmationMessage && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default ReservationPage;

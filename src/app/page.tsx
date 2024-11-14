// ReservationPage.tsx
"use client";
import React, { useState } from "react";
import trajets from "../../public/lib/data";

interface Trajet {
  destination: string;
  horaires: string[];
  tarifAllerSimple: number | null;
  tarifAllerRetour: number | null;
  type: "national" | "international";
}

const ReservationPage: React.FC = () => {
  const [typeTrajet, setTypeTrajet] = useState<"national" | "international" | "">("");
  const [allerRetour, setAllerRetour] = useState<"allerSimple" | "allerRetour" | "">("");
  const [numeroTel, setNumeroTel] = useState("");
  const [horaire, setHoraire] = useState("");
  const [selectedTrajet, setSelectedTrajet] = useState<string>("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState<number | null>(null);

  const filteredTrajets = trajets.filter((trajet: Trajet) => trajet.type === typeTrajet);

  const updatePrice = (trajet: Trajet, type: "allerSimple" | "allerRetour") => {
    const selectedPrice = type === "allerSimple" ? trajet.tarifAllerSimple : trajet.tarifAllerRetour;
    setPrice(selectedPrice);
  };

  const handleTypeTrajetChange = (value: "national" | "international") => {
    setTypeTrajet(value);
    setSelectedTrajet("");
    setHoraire("");
    setPrice(null);
  };

  const handleAllerRetourChange = (value: "allerSimple" | "allerRetour") => {
    setAllerRetour(value);
    const selectedTrajetData = filteredTrajets.find((trajet) => trajet.destination === selectedTrajet);
    if (selectedTrajetData) {
      updatePrice(selectedTrajetData, value);
    }
  };

  const handleTrajetChange = (value: string) => {
    setSelectedTrajet(value);
    setHoraire("");
    const selectedTrajetData = filteredTrajets.find((trajet) => trajet.destination === value);
    if (selectedTrajetData && allerRetour) {
      updatePrice(selectedTrajetData, allerRetour);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      typeTrajet,
      allerRetour,
      numeroTel,
      horaire,
      selectedTrajet,
      date,
      message,
      price,
    });
    alert("Réservation effectuée !");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-xl">
      <h1 className="text-3xl font-semibold text-center mb-6 text-white drop-shadow-lg">Réservez votre trajet</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">

        {/* Type de trajet */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Type de trajet :</label>
          <select
            value={typeTrajet}
            onChange={(e) => handleTypeTrajetChange(e.target.value as "national" | "international")}
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          >
            <option value="">Sélectionner</option>
            <option value="national">National</option>
            <option value="international">International</option>
          </select>
        </div>

        {/* Aller simple ou aller-retour */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Aller simple ou retour :</label>
          <select
            value={allerRetour}
            onChange={(e) => handleAllerRetourChange(e.target.value as "allerSimple" | "allerRetour")}
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            disabled={!typeTrajet}
          >
            <option value="">Sélectionner</option>
            <option value="allerSimple">Aller simple</option>
            <option value="allerRetour">Aller-retour</option>
          </select>
        </div>

        {/* Sélection du trajet */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Sélectionner un trajet :</label>
          <select
            value={selectedTrajet}
            onChange={(e) => handleTrajetChange(e.target.value)}
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            disabled={!allerRetour}
          >
            <option value="">Sélectionner</option>
            {filteredTrajets.map((trajet, index) => (
              <option key={index} value={trajet.destination}>
                {trajet.destination}
              </option>
            ))}
          </select>
        </div>

        {/* Horaire */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Sélectionner un horaire :</label>
          <select
            value={horaire}
            onChange={(e) => setHoraire(e.target.value)}
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            disabled={!selectedTrajet}
          >
            <option value="">Sélectionner</option>
            {filteredTrajets
              .find((trajet) => trajet.destination === selectedTrajet)
              ?.horaires.map((horaire, index) => (
                <option key={index} value={horaire}>
                  {horaire}
                </option>
              ))}
          </select>
        </div>

        {/* Informations supplémentaires */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Numéro de téléphone :</label>
          <input
            type="text"
            value={numeroTel}
            onChange={(e) => setNumeroTel(e.target.value)}
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Date de départ :</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-2">Message (optionnel) :</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          />
        </div>

        {/* Affichage du prix */}
        <div className="mb-6 flex justify-center items-center">
          <label className="text-gray-800 font-medium mr-4">Prix :</label>
          <p className="text-xl font-semibold text-gray-800">
            {price ? `${price} FCFA` : "Sélectionnez un trajet et un type de billet"}
          </p>
        </div>

        {/* Bouton de réservation */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Réserver
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationPage;

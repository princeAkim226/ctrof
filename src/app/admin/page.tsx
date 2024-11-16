"use client";
import React from "react";

// Liste fictive de réservations
const reservations = [
  {
    id: 1,
    nomPrenoms: "Kouadio Serge",
    destination: "Ouagadougou - Bobo-Dioulasso",
    horaire: "07h30",
    tarif: 2000,
    typeTrajet: "National",
    statut: "Confirmée",
  },
  {
    id: 2,
    nomPrenoms: "Traoré Awa",
    destination: "Ouagadougou - Abidjan",
    horaire: "10h00",
    tarif: 15000,
    typeTrajet: "International",
    statut: "En attente",
  },
  {
    id: 3,
    nomPrenoms: "Sanogo Bintou",
    destination: "Bobo-Dioulasso - Ouagadougou",
    horaire: "15h00",
    tarif: 2500,
    typeTrajet: "National",
    statut: "Confirmée",
  },
];

const ReservationsListPage: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Liste des Réservations</h1>
      
      {/* Tableau des réservations */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-700">Nom & Prénom</th>
              <th className="px-4 py-2 text-left text-gray-700">Destination</th>
              <th className="px-4 py-2 text-left text-gray-700">Horaire</th>
              <th className="px-4 py-2 text-left text-gray-700">Prix (FCFA)</th>
              <th className="px-4 py-2 text-left text-gray-700">Type de Trajet</th>
              <th className="px-4 py-2 text-left text-gray-700">Statut</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{reservation.nomPrenoms}</td>
                <td className="px-4 py-2 text-gray-700">{reservation.destination}</td>
                <td className="px-4 py-2 text-gray-700">{reservation.horaire}</td>
                <td className="px-4 py-2 text-gray-700">{reservation.tarif} FCFA</td>
                <td className="px-4 py-2 text-gray-700">{reservation.typeTrajet}</td>
                <td className="px-4 py-2 text-gray-700">{reservation.statut}</td>
                <td className="px-4 py-2 text-gray-700 flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Voir</button>
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">Modifier</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsListPage;

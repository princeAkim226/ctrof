'use client';
import React, { useState, useEffect } from "react";
import trajets from "../../public/lib/data"; // Assurez-vous que ce chemin est correct

interface Trajet {
  destination: string;
  horaires: string[];
  tarifAllerSimple: number | null;
  tarifAllerRetour: number | null;
  type: "national" | "international";
}

const ReservationPage: React.FC = () => {
  const [step, setStep] = useState(0); // Étape actuelle
  const [typeTrajet, setTypeTrajet] = useState<"national" | "international" | "">("");
  const [allerRetour, setAllerRetour] = useState<"allerSimple" | "allerRetour" | "">("");
  const [numeroTel, setNumeroTel] = useState("");
  const [horaire, setHoraire] = useState("");
  const [selectedTrajet, setSelectedTrajet] = useState<string>(""); 
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [nomPrenoms, setNomPrenoms] = useState("");
  const [showContactModal, setShowContactModal] = useState(false); // Modal pour contact ou dépôt

  // Filtrage des trajets en fonction du type sélectionné
  const filteredTrajets = trajets.filter((trajet: Trajet) => trajet.type === typeTrajet);
  const horairesInternationaux = ["2h00", "05h30", "15h30"];

  // Liste des images pour le carrousel
  const images = [
    "/images/image6.jpeg",
    "/images/image7.jpeg",
    "/images/image8.jpeg",
    "/images/image9.jpeg",
    "/images/image10.jpeg",
    "/images/image11.jpeg",
    "/images/image12.jpeg",
    "/images/image13.jpg",
    "/images/image14.jpg",
  ];

  // Mise à jour du prix en fonction du trajet et du type (aller simple ou aller-retour)

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    // Afficher le modal de confirmation
    setShowContactModal(true); // Affiche le modal de contact/dépôt
  };

  const steps = [
    {
      label: "Type de trajet",
      content: (
        <div>
          <label className="block text-gray-800 font-medium mb-2">Type de trajet :</label>
          <select
            value={typeTrajet}
            onChange={(e) => setTypeTrajet(e.target.value as "national" | "international")}
            className="w-full px-4 py-3 border rounded-md"
          >
            <option value="">Sélectionner</option>
            <option value="national">National</option>
            <option value="international">International</option>
          </select>
        </div>
      ),
    },
    {
      label: "Aller simple ou aller-retour",
      content: (
        <div>
          <label className="block text-gray-800 font-medium mb-2">Aller simple ou retour :</label>
          <select
            value={allerRetour}
            onChange={(e) => setAllerRetour(e.target.value as "allerSimple" | "allerRetour")}
            className="w-full px-4 py-3 border rounded-md"
            disabled={!typeTrajet}
          >
            <option value="">Sélectionner</option>
            <option value="allerSimple">Aller simple</option>
            <option value="allerRetour">Aller-retour</option>
          </select>
        </div>
      ),
    },
    {
      label: "Sélectionner un trajet",
      content: (
        <div>
          <label className="block text-gray-800 font-medium mb-2">Sélectionner un trajet :</label>
          <select
            value={selectedTrajet}
            onChange={(e) => setSelectedTrajet(e.target.value)}
            className="w-full px-4 py-3 border rounded-md"
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
      ),
    },
    {
      label: "Sélectionner un horaire",
      content: (
        <div>
          <label className="block text-gray-800 font-medium mb-2">Sélectionner un horaire :</label>
          <select
            value={horaire}
            onChange={(e) => setHoraire(e.target.value)}
            className="w-full px-4 py-3 border rounded-md"
            disabled={!selectedTrajet}
          >
            <option value="">Sélectionner</option>
            {typeTrajet === "international"
              ? horairesInternationaux.map((horaire, index) => (
                  <option key={index} value={horaire}>
                    {horaire}
                  </option>
                ))
              : filteredTrajets
                  .find((trajet) => trajet.destination === selectedTrajet)
                  ?.horaires.map((horaire, index) => (
                    <option key={index} value={horaire}>
                      {horaire}
                    </option>
                  ))}
          </select>
        </div>
      ),
    },
    {
      label: "Sélectionner la date",
      content: (
        <div>
          <label className="block text-gray-800 font-medium mb-2">Sélectionner la date :</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-md"
            disabled={!horaire}
          />
        </div>
      ),
    },
    {
      label: "Informations personnelles",
      content: (
        <div>
          <label className="block text-gray-800 font-medium mb-2">Nom et Prénom :</label>
          <input
            type="text"
            value={nomPrenoms}
            onChange={(e) => setNomPrenoms(e.target.value)}
            className="w-full px-4 py-3 border rounded-md mb-4"
          />
          <label className="block text-gray-800 font-medium mb-2">Numéro de téléphone :</label>
          <input
            type="text"
            value={numeroTel}
            onChange={(e) => setNumeroTel(e.target.value)}
            className="w-full px-4 py-3 border rounded-md"
          />
        </div>
      ),
    },
    {
      label: "Message",
      content: (
        <div>
          <label className="block text-gray-800 font-medium mb-2">Message :</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border rounded-md"
            rows={3}
          />
        </div>
      ),
    },
    {
      label: "Confirmation",
      content: (
        <div className="text-center">
          <p className="text-gray-800">Nom : {nomPrenoms}</p>
          <p className="text-gray-800">Trajet : {selectedTrajet}</p>
          {price !== null ? (
            <p className="text-gray-800">Prix : {price} FCFA</p>
          ) : (
            <p className="text-gray-800">Prix non disponible</p>
          )}
        </div>
      ),
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fonction pour faire défiler les images automatiquement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change d'image toutes les 3 secondes

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Réservation de Trajet</h1>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src={images[currentImageIndex]}
            alt="Carrousel Image"
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30"></div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{steps[step].label}</h2>
        {steps[step].content}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 bg-gray-300 rounded-md text-gray-800"
          onClick={handleBack}
          disabled={step === 0}
        >
          Retour
        </button>
        {step < steps.length - 1 ? (
          <button
            className="px-6 py-2 bg-blue-600 rounded-md text-white"
            onClick={handleNext}
          >
            Suivant
          </button>
        ) : (
          <button
            className="px-6 py-2 bg-green-600 rounded-md text-white"
            onClick={handleSubmit}
          >
            Réserver
          </button>
        )}
      </div>

      {showContactModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-bold mb-4">Confirmation de la réservation</h3>
            <p>Pour confirmer votre réservation, veuillez contacter le 77 00 00 00 ou effectuer un dépôt au 77 00 00 00.</p>
            <div className="mt-4">
              <button
                className="px-6 py-2 bg-gray-300 rounded-md mr-4"
                onClick={() => setShowContactModal(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;

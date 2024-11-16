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
  const [showModal, setShowModal] = useState(false); // Etat pour contrôler l'affichage du modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Nouveau modal pour la confirmation

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
  const updatePrice = (trajet: Trajet, type: "allerSimple" | "allerRetour") => {
    const selectedPrice = type === "allerSimple" ? trajet.tarifAllerSimple : trajet.tarifAllerRetour;
    setPrice(selectedPrice);
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    // Afficher le modal de confirmation
    setShowConfirmationModal(true);
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
      <h1 className="text-2xl font-semibold text-center mb-6">Réservez votre trajet</h1>

      {/* Image Carrousel */}
      <div className="mb-6">
        <div className="relative">
          <img
            src={images[currentImageIndex]}
            alt={`Trajet ${currentImageIndex + 1}`}
            className="w-full h-60 object-cover rounded-md"
          />
        </div>
      </div>

      {/* Form Content */}
      <div>{steps[step].content}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button onClick={handleBack} className="py-2 px-4 bg-gray-300 rounded-md">
            Retour
          </button>
        )}
        {step < steps.length - 1 ? (
          <button onClick={handleNext} className="py-2 px-4 bg-blue-500 text-white rounded-md">
            Suivant
          </button>
        ) : (
          <button onClick={handleSubmit} className="py-2 px-4 bg-green-500 text-white rounded-md">
            Réserver
          </button>
        )}
      </div>

      {/* Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-80">
            <h2 className="text-lg font-semibold">Confirmation de Réservation</h2>
            <p>Pour finaliser votre réservation, veuillez contacter le numéro suivant pour confirmation ou effectuer un dépôt :</p>
            <p className="font-bold">+226 123 456 789</p>
            <button onClick={() => setShowConfirmationModal(false)} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;

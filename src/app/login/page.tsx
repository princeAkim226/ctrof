'use client';

import React, { useState } from "react";

const AdminLoginPage: React.FC = () => {
  const [numeroTel, setNumeroTel] = useState<string>("");
  const [motDePasse, setMotDePasse] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!numeroTel || !motDePasse) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (numeroTel !== "77000000" || motDePasse !== "admin123") {
      setError("Numéro de téléphone ou mot de passe incorrect.");
      return;
    }

    // Si la validation réussit, rediriger l'utilisateur ou effectuer une action
    setError("");
    alert("Connexion réussie");
    // Rediriger vers la page d'administration, par exemple :
    // window.location.href = "/admin-dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Connexion Admin</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2">Numéro de téléphone</label>
            <input
              type="text"
              value={numeroTel}
              onChange={(e) => setNumeroTel(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              placeholder="Entrez votre numéro de téléphone"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              placeholder="Entrez votre mot de passe"
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

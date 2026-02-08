/*
Den här komponenten visar en bekräftelse efter att en bokning har skapats.
Den tar emot bokningsdata som props och visar informationen för användaren.
Om ingen bokningsdata finns visas ingenting.
*/

import React from "react";

// Komponenten tar emot bookingData från föräldrakomponenten
const Confirmation = ({ bookingData }) => {

  // Om ingen bokningsdata finns, visa ingenting
  if (!bookingData) return null;

   return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card p-4 shadow text-white" style={{ maxWidth: "400px", width: "100%", backgroundColor: "#343a40" }}>
        <h2 className="text-center mb-4">Bokning bekräftad!</h2>

        <ul className="list-unstyled">
          <li><strong>Bord:</strong> {bookingData.bordId}</li>
          <li><strong>Datum & tid:</strong> {bookingData.date} {bookingData.time}</li>
          <li><strong>Antal gäster:</strong> {bookingData.antalGaster}</li>
          <li><strong>Namn:</strong> {bookingData.kundNamn}</li>
          <li><strong>Telefon:</strong> {bookingData.kundTelefon}</li>
        </ul>

        <div className="text-center mt-4">
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()} // går tillbaka till start
          >
            Ny bokning
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

import React from "react";

const Confirmation = ({ bookingData }) => {
  if (!bookingData) return null;

  return (
    <div>
      <h2>Bokning bekräftad!</h2>
      <p>Bord: {bookingData.bordId}</p>
      <p>Datum & tid: {bookingData.date} {bookingData.time}</p>
      <p>Antal gäster: {bookingData.antalGaster}</p>
      <p>Namn: {bookingData.kundNamn}</p>
      <p>Telefon: {bookingData.kundTelefon}</p>
    </div>
  );
};

export default Confirmation;

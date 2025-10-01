import React, { useState } from "react";
import SelectDate from "./SelectDate";
import SelectTable from "./SelectTable";
import CustomerForm from "./CustomerForm";
import Confirmation from "./Confirmation";
import ProgressBar from "./ProgressBar";

const BookingFlow = () => {
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    antalGaster: 1,
    bordId: null,
    kundNamn: "",
    kundTelefon: ""
  });

  const [tables, setTables] = useState([]);
  const [error, setError] = useState("");

  const handleDateNext = () => {
    setError("");

    fetch(
      `https://localhost:7179/api/Bord/available?date=${bookingData.date}&time=${bookingData.time}&antalGaster=${bookingData.antalGaster}`
    )
      .then((response) => {
        if (!response.ok) {
          setError("Kunde inte hämta bord");
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setTables(data);
        setStep(2);
      })
      .catch((err) => {
        setError("Något gick fel: " + err.message);
      });
  };

  const handleSubmitBooking = () => {
    setError("");

    // Hämta token från localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Du måste logga in först");
      return;
    }

    fetch("https://localhost:7179/api/Bokningar", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  // Lägg till token här
      },
      body: JSON.stringify({
        BordId: bookingData.bordId,
        StartTime: bookingData.date + "T" + bookingData.time,
        AntalGaster: bookingData.antalGaster,
        KundNamn: bookingData.kundNamn,
        KundTelefon: bookingData.kundTelefon
      })
    })
      .then((response) => {
        if (!response.ok) {
          setError("Kunde inte skapa bokningen");
          return;
        }
        setStep(4);
      })
      .catch((err) => {
        setError("Något gick fel: " + err.message);
      });
  };

  return (
    <div>
      <h1>Bokningsflöde</h1>
      <ProgressBar step={step} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {step === 1 && (
        <SelectDate bookingData={bookingData} setBookingData={setBookingData} nextStep={handleDateNext} />
      )}
      {step === 2 && (
        <SelectTable
          tables={tables}
          selectedTable={bookingData.bordId}
          setSelectedTable={(id) => setBookingData({ ...bookingData, bordId: id })}
          nextStep={() => setStep(3)}
        />
      )}
      {step === 3 && (
  <CustomerForm
    name={bookingData.kundNamn}
    setName={(value) => setBookingData({ ...bookingData, kundNamn: value })}
    phone={bookingData.kundTelefon}
    setPhone={(value) => setBookingData({ ...bookingData, kundTelefon: value })}
    submitBooking={handleSubmitBooking}
  />
)}

      {step === 4 && <Confirmation bookingData={bookingData} />}
    </div>
  );
};

export default BookingFlow;

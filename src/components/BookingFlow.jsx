/*
Den här komponenten styr hela bokningsflödet i React.
Den håller reda på vilket steg användaren är på,
sparar all bokningsdata (datum, bord, kunduppgifter),
hämtar lediga bord från API:t och skickar bokningen till backend.
*/

import React, { useState } from "react";
import SelectDate from "./SelectDate";
import SelectTable from "./SelectTable";
import CustomerForm from "./CustomerForm";
import Confirmation from "./Confirmation";
import ProgressBar from "./ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap

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
  const [loading, setLoading] = useState(false); // NYTT för spinner

  const handlePrevStep = () => {
  if (step > 1) {
    setStep(step - 1);
  }
};

  // Hämtar lediga bord
  const handleDateNext = () => {
    setError("");
    setLoading(true); // START loading

    fetch(
      `https://localhost:7179/api/Bord/available?date=${bookingData.date}&time=${bookingData.time}&antalGaster=${bookingData.antalGaster}`
    )
      .then((res) => {
        setLoading(false); // STOP loading
        if (!res.ok) {
          setError("Kunde inte hämta bord");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setTables(data);
        setStep(2);
      })
      .catch((err) => {
        setLoading(false);
        setError("Något gick fel: " + err.message);
      });
  };

  // Skickar bokning
  const handleSubmitBooking = () => {
    setError("");
    setLoading(true); // START loading

    

    fetch("https://localhost:7179/api/Bokningar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BordId: bookingData.bordId,
        StartTime: bookingData.date + "T" + bookingData.time,
        AntalGaster: bookingData.antalGaster,
        KundNamn: bookingData.kundNamn,
        KundTelefon: bookingData.kundTelefon
      })
    })
      .then((res) => {
        setLoading(false); // STOP loading
        if (!res.ok) {
          setError("Kunde inte skapa bokningen");
          return;
        }
        setStep(4);
      })
      .catch((err) => {
        setLoading(false);
        setError("Något gick fel: " + err.message);
      });
  };

  return (
    <div className="bg-secondary min-vh-100 d-flex flex-column align-items-center justify-content-center p-3">
      <h1 className="text-center text-white mb-4">Boka ditt bord här!</h1>

      <ProgressBar step={step} />

      {error && <p className="text-danger mt-2">{error}</p>}

      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Laddar...</span>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {step === 1 && (
            <SelectDate
              bookingData={bookingData}
              setBookingData={setBookingData}
              nextStep={handleDateNext}
            />
          )}

          {step === 2 && (
  <SelectTable
    tables={tables}
    selectedTable={bookingData.bordId}
    setSelectedTable={(id) =>
      setBookingData({ ...bookingData, bordId: id })
    }
    nextStep={() => setStep(3)}
    prevStep={handlePrevStep} // ← ny prop
  />
)}

{step === 3 && (
  <CustomerForm
    name={bookingData.kundNamn}
    setName={(value) =>
      setBookingData({ ...bookingData, kundNamn: value })
    }
    phone={bookingData.kundTelefon}
    setPhone={(value) =>
      setBookingData({ ...bookingData, kundTelefon: value })
    }
    submitBooking={handleSubmitBooking}
    prevStep={handlePrevStep} // ← ny prop
  />
)}

          {step === 4 && <Confirmation bookingData={bookingData} />}
        </>
      )}
    </div>
  );
};

export default BookingFlow;

import React from "react";

function SelectDate(props) {
  const { bookingData, setBookingData, nextStep } = props;

  function handleDateChange(e) {
    setBookingData({ ...bookingData, date: e.target.value });
  }

  function handleTimeChange(e) {
    setBookingData({ ...bookingData, time: e.target.value });
  }

  function handleGuestsChange(e) {
    const value = e.target.value;
    setBookingData({ ...bookingData, antalGaster: value ? parseInt(value) : 1 });
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      {/* Kort bakgrund för formuläret */}
      <div className="p-4 rounded shadow-lg" style={{ backgroundColor: "#007bff", minWidth: "320px", maxWidth: "500px" }}>
        <h2 className="text-white text-center mb-4">Välj datum och tid</h2>

        <div className="mb-3">
          <input
            type="date"
            value={bookingData.date || ""}
            onChange={handleDateChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="time"
            value={bookingData.time || ""}
            onChange={handleTimeChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            value={bookingData.antalGaster || 1}
            onChange={handleGuestsChange}
            min="1"
            placeholder="Antal gäster"
            className="form-control"
          />
        </div>

        <div className="text-center">
          <button
            onClick={nextStep}
            className="btn btn-light px-5"
          >
            Nästa
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectDate;

import React from "react";

function SelectDate(props) {
  const bookingData = props.bookingData;
  const setBookingData = props.setBookingData;
  const nextStep = props.nextStep;

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
    <div>
      <h2>Välj datum och tid</h2>
      <input
        type="date"
        value={bookingData.date || ""}
        onChange={handleDateChange}
      />
      <input
        type="time"
        value={bookingData.time || ""}
        onChange={handleTimeChange}
      />
      <input
        type="number"
        value={bookingData.antalGaster || 1}
        onChange={handleGuestsChange}
        min="1"
        placeholder="Antal gäster"
      />
      <br />
      <button onClick={nextStep} style={{ marginTop: "10px" }}>
        Nästa
      </button>
    </div>
  );
}

export default SelectDate;

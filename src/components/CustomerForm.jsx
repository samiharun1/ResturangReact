import React from "react";

function CustomerForm(props) {
  const name = props.name || "";
  const setName = props.setName;
  const phone = props.phone || "";
  const setPhone = props.setPhone;
  const submitBooking = props.submitBooking;

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }

  return (
    <div>
      <h2>Dina uppgifter</h2>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Namn"
      />
      <input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Telefon"
      />
      <br />
      <button onClick={submitBooking} style={{ marginTop: "10px" }}>
        Skicka bokning
      </button>
    </div>
  );
}

export default CustomerForm;

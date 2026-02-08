import React from "react";

function CustomerForm(props) {
  const { name = "", setName, phone = "", setPhone, submitBooking, prevStep } = props;

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      {/* Större kort för formuläret */}
      <div
        className="card p-5 shadow"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#343a40",
          color: "white",
        }}
      >
        <h2 className="text-center mb-4">Dina uppgifter</h2>

        <div className="mb-3">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Namn"
            className="form-control form-control-lg"
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Telefon"
            className="form-control form-control-lg"
          />
        </div>

        {/* Knapp-rad: Tillbaka + Skicka */}
        <div className="d-flex justify-content-between mt-4">
          <button
            onClick={prevStep} // ← går tillbaka ett steg
            className="btn btn-secondary"
          >
            Tillbaka
          </button>

          <button
            onClick={submitBooking}
            className="btn btn-primary"
          >
            Skicka bokning
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;

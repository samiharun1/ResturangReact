import React from "react";

function SelectTable(props) {
  const { tables, selectedTable, setSelectedTable, nextStep, prevStep } = props;

  function handleClick(id) {
    setSelectedTable(id);
  }

  if (tables.length === 0) {
    return (
      <div className="form-container">
        <h2>Välj bord</h2>
        <p>Inga tillgängliga bord</p>
        <button onClick={prevStep} className="btn btn-secondary mt-3">
          Tillbaka
        </button>
      </div>
    );
  }

  return (
    <div className="form-container text-center">
      <h2>Välj bord</h2>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
        {tables.map((table) => {
          const isSelected = selectedTable === table.id;
          return (
            <button
              key={table.id}
              className={`btn ${isSelected ? "btn-primary" : "btn-light"}`}
              onClick={() => handleClick(table.id)}
            >
              Bord {table.bordNummer} - Kapacitet: {table.kapacitet}
            </button>
          );
        })}
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button onClick={prevStep} className="btn btn-secondary">
          Tillbaka
        </button>
        <button
          onClick={nextStep}
          disabled={selectedTable === null}
          className="btn btn-dark"
        >
          Nästa
        </button>
      </div>
    </div>
  );
}

export default SelectTable;
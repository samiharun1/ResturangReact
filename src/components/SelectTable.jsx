import React from "react";

function SelectTable(props) {
  const tables = props.tables;
  const selectedTable = props.selectedTable;
  const setSelectedTable = props.setSelectedTable;
  const nextStep = props.nextStep;

  function handleClick(id) {
    setSelectedTable(id);
  }

  if (tables.length === 0) {
    return (
      <div>
        <h2>Välj bord</h2>
        <p>Inga tillgängliga bord</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Välj bord</h2>
      <ul>
        {tables.map((table) => {
          const isSelected = selectedTable === table.id;
          const buttonStyle = {
            backgroundColor: isSelected ? "lightgreen" : "white"
          };
          return (
            <li key={table.id}>
              <button onClick={() => handleClick(table.id)} style={buttonStyle}>
                Bord {table.bordNummer} - Kapacitet: {table.kapacitet}
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={nextStep} disabled={selectedTable === null} style={{ marginTop: "10px" }}>
        Nästa
      </button>
    </div>
  );
}

export default SelectTable;

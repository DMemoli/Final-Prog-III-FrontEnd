import { Tooltip } from "antd";

const seatStyle = {
  background: "#e6f4f5",
  height: "20px",
  width: "20px",
  margin: "5px",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
};

const seatStylePlateaBaja = {
  background: "#7ed3f7",
  height: "20px",
  width: "20px",
  margin: "5px",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
};

const seatStylePlateaAlta = {
  background: "#183af5",
  height: "20px",
  width: "20px",
  margin: "5px",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
};

const seatStyleUnavailable = {
  background: "#ff0400",
  height: "20px",
  width: "20px",
  margin: "5px",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
};

const seatStyleSelected = {
  background: "#28a745", // verde
  height: "20px",
  width: "20px",
  margin: "5px",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
};

const rowStyle = {
  display: "flex",
  justifyContent: "center",
};

function SeatsLayout({ data, onSeatSelect, selectedSeats }) {
  const theater = data;

  if (theater && theater.seats && theater.seats.length > 0) {
    const rowCount = Math.max(...theater.seats.map((seat) => Number(seat.row)));
    const seatRows = new Array(rowCount).fill(null).map(() => []);

    theater.seats.forEach((seat) => {
      // Determinar si el asiento está seleccionado
      const isSelected = selectedSeats && selectedSeats.includes(seat._id);
      const styleToUse = isSelected
        ? seatStyleSelected
        : seat.available === true
        ? seat.type === "platea_alta"
          ? seatStylePlateaAlta
          : seat.type === "platea_baja"
          ? seatStylePlateaBaja
          : seatStyle
        : seatStyleUnavailable;

      seatRows[Number(seat.row) - 1].push(
        <div key={seat._id}>
          <Tooltip title={`${seat.type} Fila: ${seat.row} Columna: ${seat.column}`}>
            <button
              type="button"
              onClick={() => {
                if (seat.available) {
                  onSeatSelect && onSeatSelect(seat);
                }
              }}
              style={styleToUse}
              value={seat._id}
            ></button>
          </Tooltip>
        </div>
      );
    });

    const rows = seatRows.map((row, index) => (
      <div style={rowStyle} key={index}>
        {row}
      </div>
    ));

    return <>{rows}</>;
  }
  return null;
}

export default SeatsLayout;


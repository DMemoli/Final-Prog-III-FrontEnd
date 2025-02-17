import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';

const seatStyle = {
  background: '#e6f4f5',
  height: '20px',
  width: '20px',
  margin: '5px',
  borderTopRightRadius: '20px',
  borderTopLeftRadius: '20px',
};

const seatStylePlateaBaja = {
  background: '#7ed3f7',
  height: '20px',
  width: '20px',
  margin: '5px',
  borderTopRightRadius: '20px',
  borderTopLeftRadius: '20px',
};

const seatStylePlateaAlta = {
  background: '#183af5',
  height: '20px',
  width: '20px',
  margin: '5px',
  borderTopRightRadius: '20px',
  borderTopLeftRadius: '20px',
};

const seatStyleUnavailable = {
    background: '#ff0400',
    height: '20px',
    width: '20px',
    margin: '5px',
    borderTopRightRadius: '20px',
    borderTopLeftRadius: '20px',
  };

const rowStyle = {
  display: 'flex',
  justifyContent: 'center',
};

function SeatsLayout({ data }) {
  const theater = data;
  
  if (theater && theater.seats && theater.seats.length > 0) {
    // Para asegurarnos de trabajar con números en las filas (ya que pueden venir como string)
    const rowCount = Math.max(...theater.seats.map(seat => Number(seat.row)));

    // Crear un arreglo de filas vacío
    const seatRows = new Array(rowCount).fill(null).map(() => []);

    // Ubicar cada asiento en la fila correspondiente (asumiendo que seat.row es 1-indexado)
    theater.seats.forEach(seat => {
      seatRows[Number(seat.row) - 1].push(
        <div key={seat._id}>
          <Tooltip title={`${seat.type} Fila: ${seat.row} Columna: ${seat.column}`}>
            <button
              type="button"
              style={
                seat.available === true ?
                seat.type === 'platea_alta'
                  ? seatStylePlateaAlta
                  : seat.type === 'platea_baja'
                  ? seatStylePlateaBaja
                  : seatStyle
                  : seatStyleUnavailable
              }
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

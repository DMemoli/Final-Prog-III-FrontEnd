import { Button, Collapse, Tooltip, Divider } from 'antd'
import { Link } from 'react-router-dom'
import playsService from '../services/playapi'
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

const rowStyle = {
  display: 'flex',
  justifyContent: 'center'
};

function Theaters({ data }) {
  //const id = url.split('/')[5]
  console.log(data);
  var items = [];
  data.map((theater) => {

    items.push({
      label: theater.name,
      children:
        <>

          <Divider orientation="center">ESCENARIO</Divider>
          {seatsLayout(theater)}

          <li>
            <Link to={`/theaters/edit/${theater._id}`}>
              <Button>Editar</Button>
            </Link>
            <Link to="/admin" onClick={() => playsService.deleteTheater(theater._id).then(() => {
              // Eliminación exitosa, recargar la página
              window.location.reload();
            })}>
              <Button >Borrar</Button>
            </Link></li>

        </>
    })
  })


  return (
    <>
      <Collapse accordion items={items} />
    </>

  )
}


  function seatsLayout(theater) {
    if (theater && theater.seats && theater.seats.length > 0) {
      console.log(theater);
      
      // Calcular el número máximo de fila basado en los asientos
      const rowCount = Math.max(...theater.seats.map(seat => seat.row));
      
      // Crear un arreglo de filas, cada una como un array vacío
      const seatRows = new Array(rowCount).fill(null).map(() => []);
      
      // Ubicar cada asiento en la fila correspondiente
      theater.seats.forEach((seat) => {
        // Se asume que seat.row es 1-indexado
        seatRows[seat.row - 1].push(
          <div key={seat._id} span={4}>
            <Tooltip title={`${seat.type} Fila: ${seat.row} Columna: ${seat.column}`}>
              <button style={seat.type === 'platea_alta' ? seatStylePlateaAlta : seat.type === 'platea_baja' ? seatStylePlateaBaja : seatStyle} value={seat._id}></button>
            </Tooltip>
          </div>
        );
      });
      
      const rows = seatRows.map((row, index) => (
        <div style={rowStyle} key={index} span={4}>
          {row}
        </div>
      ));
      
      console.log(rows);
      return <>{rows}</>;
    }
    return null;
  }


export default Theaters
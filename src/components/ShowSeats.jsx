import { Button, Collapse, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import playsService from '../services/playapi'
const seatStyle = {
  background: '#444451',
  height: '20px',
  width: '20px',
  margin: '5px',
  borderTopRightRadius: '20px',
  borderTopLeftRadius: '20px',
};
const rowStyle = {
  display: 'flex',
};

function ShowSeats({ data }) {
  //const id = url.split('/')[5]
  console.log(data);
  var items = [];
  data.map((theater) => {

    items.push({
      label: theater.name,
      children:
        <>

          <div>PANTALLA</div>
          {seatsLayout(theater)}

          <li>
            <Link to={`/theaters/edit/${theater._id}`}>
              <Button>Editar</Button>
            </Link>
            <Link to="/usuarios" onClick={() => playsService.deleteTheater(theater._id).then(() => {
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
  let row = theater.seats[(theater.seats.length) - 1].row,
    index = 1,
    seats = new Array(row)
  for (let i = 0; i < row; i++) {
    seats[i] = []; // Inicializar cada elemento como un array vacío
  }
  theater.seats.map((seat) => {
    if (seat.row == index) {
      seats[index - 1].push(
        <div key={seat._id} span={4}>
          <Tooltip title={seat.type + " Fila: " + seat.row + " Columna: " + seat.column}>
            <button style={seatStyle} value={seat._id}></button>
          </Tooltip>
        </div>
      )
    } else {
      index++
      seats[index - 1].push(
        <div key={seat._id} span={4}>
          <Tooltip title={seat.type + " Fila: " + seat.row + " Columna: " + seat.column}>
            <button style={seatStyle} value={seat._id}></button>
          </Tooltip>
        </div>
      )
    }
  })

  const rows = Array.from({ length: row }, (_, index) => (
    <div style={rowStyle} key={index} span={4}>
      {seats[index]}
    </div>
  ));

  console.log(rows)
  return (
    <>{rows}</>
  );
}


export default ShowSeats
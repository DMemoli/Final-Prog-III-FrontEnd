import { Button, Collapse } from 'antd'
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

function Theaters({ data }) {
  //const id = url.split('/')[5]
  console.log(data);
  var items = [];
  var seats = "<div>Hola</div>";
  data.map((theater) => {
    let pivot = "1";


    items.push({
      label: theater.name,
      children:
        <>
                  
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
  let row = theater.seats[(theater.seats.length) - 1].row;
  let column = theater.seats[(theater.seats.length) - 1].column;
  const seats = Array.from({ length: column }, (_, index) => (
    <div key={index} span={4}>
      <div style={seatStyle}></div>
    </div>
  ));
  const rows =Array.from({ length: row }, (_, index) => (
    <div style={rowStyle} key={index} span={4}>
      {seats}
    </div>
  ));
  console.log(rows)
  return (
    <>{rows}</> 
  );
}
function seatsLayout2(theater) {
  let row = theater.seats[(theater.seats.length) - 1].row;
  let column = theater.seats[(theater.seats.length) - 1].column;
  const seats = Array.from({ length: column }, (_, index) => (
    <div key={index} span={4}>
      <div style={seatStyle}></div>
    </div>
  ));
  const rows =Array.from({ length: row }, (_, index) => (
    <div style={rowStyle} key={index} span={4}>
      {seats}
    </div>
  ));
  return (
    <>{rows}</> 
  );
}


export default Theaters
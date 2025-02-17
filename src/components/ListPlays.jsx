import { Button, Collapse } from 'antd'
import { Link } from 'react-router-dom'
import playsService from '../services/playapi'


function Plays({data}) {
  //const id = url.split('/')[5]
  console.log(data);
  var items = [];
  data.map((play)=>{items.push({
    label: play.name,
    children: <p><li>Elenco: {play.cast}</li><li>Trama: {play.plot}</li><li>
      <Link to={`/shows/${play._id}`}>
        <Button>Funciones</Button>
      </Link>
      <Link to={`/plays/edit/${play._id}`}>
        <Button>Editar</Button>
      </Link>
      <Link to="/admin" onClick={()=>playsService.deletePlay(play._id).then(() => {
            // Eliminación exitosa, recargar la página
            window.location.reload();
        })}>
        <Button >Borrar</Button>
    </Link></li></p>
  })})


  return (
    <>
    <Collapse accordion items={items} />
    </>
    
  )
}

export default Plays
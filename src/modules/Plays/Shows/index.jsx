import { useEffect, useState } from 'react'
import { Descriptions, Row, Divider, Col, Collapse, Button } from 'antd'
import playsService from '../../../services/playapi'
import { useParams, Link } from 'react-router-dom'
import CreateShow from '../../../components/createShow'

function ListShows() {
  const { id } = useParams()
  const [play, setPlay] = useState()
  const [theaters, setTheaters] = useState([]);
  const [items, setItems] = useState([{
    key: '1',
    label: 'Nombre',
    children: '',
  },
  {
    key: '2',
    label: 'Elenco',
    children: '',
  },
  {
    key: '3',
    label: 'Trama',
    children: '',
  },
  {
    key: '4',
    label: 'Funciones',
    children: '',
  }])
  var shows = [];
 


  useEffect(() => {
    const fetchData = async () => {
      const response = await playsService.getPlayById(id)
      console.log(response)
      setPlay(response)
      const response2 = await playsService.getTheaters();
      console.log(response2)
      setTheaters(response2)
      setItems([{
        key: '1',
        label: 'Nombre',
        children: response.name,
      },
      {
        key: '2',
        label: 'Elenco',
        children: response.cast,
      },
      {
        key: '3',
        label: 'Trama',
        children: response.plot,
      },
      {
        key: '4',
        label: 'Funciones',
        children: <pre>{response.performances == 0? "No existen funciones": <Collapse accordion items={shows} />} </pre>,
      }])
      shows = [];
      response.performances.map((show) => {
      const theater = response2.find(t => t._id === show.theater_hall);
      console.log(theater)
        shows.push({
          label: 'Fecha: '+ show.date.slice(0,10) + '   -   Hora: '+ show.date.slice(11,16) +'  -   Sala: '+theater.name,
          children:
            <>
                  <Divider orientation="center">ESCENARIO</Divider>        
                  <li>
                <Link to={`/funciones/edit/${show._id}`}>
                  <Button>Editar</Button>
                </Link>
                <Link to={`/shows/${id}`} onClick={() => playsService.deleteShow(show._id, id).then(() => {
                  // Eliminación exitosa, recargar la página
                  window.location.reload();
                })}>
                  <Button >Borrar</Button>
                </Link></li>
    
            </>
        })
      })

    }
    fetchData()
    console.log(JSON.stringify(play))
  }, [])

   
  return (
    <>
      <Row>
          <Col flex={2}><Divider orientation="left">Informacion de la Obra</Divider>
          <Descriptions layout="vertical" bordered items={items} /></Col>
          <Col flex={3}><Divider orientation="left">Crear Función</Divider>
          <CreateShow data={id}/></Col>
        </Row>
      
      {(play && play.performances)?play.performances.map((f)=> {"Hola"+f}):"No tiene"}
      

    
    </>
  )
}

export default ListShows

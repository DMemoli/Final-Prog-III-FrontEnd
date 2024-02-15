import { useEffect, useState } from 'react'
import { Descriptions } from 'antd'
import playsService from '../../../services/playapi'
import { useParams } from 'react-router-dom'
import CreateShow from '../../../components/createShow'

function ListShows() {
  const { id } = useParams()
  const [play, setPlay] = useState()
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
  useEffect(() => {
    const fetchData = async () => {
      const response = await playsService.getPlayById(id)
      console.log(response)
      setPlay(response)
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
        children: <pre>{JSON.stringify(response.performances, null, 3)}</pre>,
      }])
    }
    fetchData()
    console.log(JSON.stringify(play))
  }, [])

   
  return (
    <>
      <Descriptions title="Información de la obra" layout="vertical" bordered items={items} />
      {(play && play.performances)?play.performances.map((f)=> {"Hola"+f}):"No tiene"}
      <CreateShow data={id}/>

    
    </>
  )
}

export default ListShows

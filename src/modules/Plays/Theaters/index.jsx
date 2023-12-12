import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import playsService from '../../../services/playapi'
import Theaters from '../../../components/ListTheaters'



function ListTheaters() {
  const [isLoading, setIsLoading] = useState(false)
  const [plays, setPlays] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await playsService.getTheaters()
      console.log(response)
      setPlays(response)
      setIsLoading(false)
    }
    fetchData()
    console.log(JSON.stringify(plays))
  }, [])
  return (
    <>
      {isLoading ? (
        <Spin tip="Cargando listado..." size="large">
          <div className="content" />
        </Spin>
      ) : ( 
          <Theaters data={plays}/>) 

}   
    </>
  )
}

export default ListTheaters

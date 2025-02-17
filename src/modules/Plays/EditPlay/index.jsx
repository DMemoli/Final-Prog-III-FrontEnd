import { Spin } from 'antd'
import playsService from '../../../services/playapi'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UpdatePlay from '../../../components/UpdatePlay'

function editPlay() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [play, setPlayInfo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await playsService.getPlayById(id)
      setPlayInfo(response)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <>
      {isLoading ? (
        <Spin tip="Cargando info del la obra..." size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          
          <UpdatePlay data={{play}} />
        </div>
        
      )}
    </>
  )
}

export default editPlay
import { Spin } from 'antd'
import usersService from '../../../services/userapi'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UpdateUser from '../../../components/UpdateUser'

function editarUsuario() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await usersService.getUserById(id)
      console.log(response)
      setUserInfo(response)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <>
      {isLoading ? (
        <Spin tip="Cargando info del usuario..." size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          
          <UpdateUser data={{userInfo}} />
        </div>
        
      )}
    </>
  )
}

export default editarUsuario
//<pre>{JSON.stringify(userInfo, null, 2)}</pre>
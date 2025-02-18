import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import Cliente from "../../components/Cliente";
import Admin from "../../components/Admin";
import Home from '../Home'



function Usuarios() {
  const [isLoading, setIsLoading] = useState(false)
  const [usuario, setUsuario] = useState([])
  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    const decoded = jwtDecode(token) 
    setUsuario(decoded)
    
    console.log(usuario)
  }, [])

  if(usuario && usuario.role=="client"){
    return (
      <>
      <Cliente/> 
      </>
    )
  }(usuario && usuario.role=="admin")
  return (
    <>
     <Admin/>

    </>
  )
}

export default Usuarios


import { Tooltip, Button} from "antd";
import {
    UserOutlined,
    LogoutOutlined,
    LoginOutlined,
  } from '@ant-design/icons'
import { useEffect, useState } from "react";
function Topbar(){
    const [nombreTeatro, setNombreTeatro] = useState("Teatro");
    const [loggedIn, setLoggedIn] = useState([]);
    useEffect(()=>{
        setLoggedIn(window.sessionStorage.getItem("token"))
        setNombreTeatro(import.meta.env.VITE_NOMBRE_TEATRO || "Ingrese el nombre del teatro en .env");
    }, [])


    return(
      
        <>
        <h1><a href="/">{nombreTeatro}</a></h1>
        {(loggedIn)?<><Tooltip title="Ver perfil">
            <Button href="/admin" type="primary" shape="circle" size="large" icon={<UserOutlined />} />
        </Tooltip><Tooltip title="Cerrar Sesion">
            <Button href="/logout" type="primary" shape="circle" size="large" icon={<LogoutOutlined />} />
        </Tooltip></>:<Tooltip title="Iniciar sesion">
            <Button href="/login" type="primary" shape="circle" size="large" icon={<LoginOutlined />} />
        </Tooltip>}

        </>
    
    )

}

export default Topbar;
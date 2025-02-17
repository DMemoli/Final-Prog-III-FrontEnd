import { Button, Collapse } from 'antd'
import { Link } from 'react-router-dom'
import usersService from '../services/userapi'


function Users({data}) {
  console.log(data);
  var items = [];
  data.map((user)=>{items.push({
    label: user.lastName +" "+user.firstName,
    children: <p><li>Email: {user.email}</li><li>Telefono: + {user.prefix} - {user.phone}</li><li>Rol: {user.role.name}</li><li>Id: {user._id}</li><li>
      <Link to={`/admin/editar/${user._id}`}>
        <Button>Editar</Button>
      </Link>
      <Link to="/admin" onClick={()=>usersService.deleteUser(user._id).then(() => {
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

export default Users
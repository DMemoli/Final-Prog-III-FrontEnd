import CreatePlay from "./CreatePlay"
import ListPlays from "../modules/Plays/ListPlays"
import CreateUser from "./CreateUser"
import ListarUsuarios from "../modules/Usuarios/ListarUsuarios"
import CreateTheater from "./CreateTheater";
import ListTheaters from "../modules/Plays/Theaters"
import { Divider, Tabs, Col, Row } from 'antd';


function Admin() {
  const items = [
    {
      key: '1',
      label: 'Obras',
      children: <>
        <Row>
          <Col flex={2}><Divider orientation="left">Listado de obras</Divider>
            <ListPlays /></Col>
          <Col flex={3}><Divider orientation="left">Crear Obra</Divider>
            <CreatePlay /></Col>
        </Row>
      </>,
    },
    {
      key: '2',
      label: 'Salas',
      children: <>
        <Row>
          <Col flex={2}><Divider orientation="left">Listado de Salas</Divider>
            <ListTheaters /></Col>
          <Col flex={3}> <Divider orientation="left">Crear Sala</Divider>
            <CreateTheater /></Col>
        </Row>
      </>,
    },
    {
      key: '3',
      label: 'Usuarios',
      children: <>
        <Row>
          <Col flex={2}><Divider orientation="left">Listado de Usuarios</Divider>
            <ListarUsuarios /></Col>
          <Col flex={3}> <Divider orientation="left">Crear Usuario</Divider>
            <CreateUser /></Col>
        </Row>
      </>,
    },
  ];


  return (
    <>
      <Divider>Administrador</Divider>
      <Tabs
        type="card"
        items={items}
      />
    </>
  )
}

export default Admin

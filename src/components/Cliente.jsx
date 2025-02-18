import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Collapse, Row, Col, Divider, Descriptions, Card, Button } from 'antd';
import usersService from '../services/userapi';
import playsService from "../services/playapi";

function Cliente() {
  const [isLoading, setIsLoading] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [tickets, setTickets] = useState([]);
  const [items, setItems] = useState([
    { key: '1', label: 'Nombre Completo', children: '' },
    { key: '2', label: 'Correo', children: '' },
    { key: '3', label: 'Telefono', children: '' },
    { key: '4', label: 'Entradas', children: '' }
  ]);

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    const decoded = jwtDecode(token);
    setUsuario(decoded);

    const fetchData = async () => {
      setIsLoading(true);
      const response = await usersService.getUserById(decoded._id);
      setUsuario(response);
      const response2 = await playsService.getTicketsByClient(decoded._id);
      setIsLoading(false);

      // Actualizamos los items de las Descriptions
      setItems([
        { key: '1', label: 'Nombre Completo', children: response.firstName + ' ' + response.lastName },
        { key: '2', label: 'Correo', children: response.email },
        { key: '3', label: 'Telefono', children: "(" + response.prefix + ")" + response.phone },
        { key: '4', label: 'Entradas', children: "" }
      ]);

      // Creamos el array de tarjetas para el Collapse
      const cards = response2.map((t) => ({
        label: t.playName + "  |   Día: " + t.date.slice(0, 10) + "   |   Hora: " + t.date.slice(11, 16),
        children: (
          <ul>
            {t.seats.map((s) => (
              <li key={s.seatId_}>{s.seatLabel}</li>
            ))}
            <Link
              to="/"
              onClick={() =>
                playsService.deleteTicket(t._id).then(() => {
                  // Eliminación exitosa, recargar la página
                  window.location.reload();
                })
              }
            >
              <Button>Eliminar Entradas</Button>
            </Link>
          </ul>
        )
      }));

      setTickets(cards);
    };

    fetchData();
  }, []);

  return (
    <>
      <Divider orientation="Center">Bienvenido {usuario.firstName}</Divider>
      <Descriptions layout="vertical" bordered items={items} />
      <Collapse accordion items={tickets} />
    </>
  );
}

export default Cliente;

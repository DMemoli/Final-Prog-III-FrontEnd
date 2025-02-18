import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import playsService from "../../../services/playapi";
import { Button, message, Steps, theme, Form, Select, Card, Col, Row } from "antd";
import CompraTarjeta from "../../../components/CompraTarjeta";
import SeatsLayout from "../../../components/seatsLayout";
import usersService from '../../../services/userapi'
import { jwtDecode } from "jwt-decode"

function ComprarObra() {
  const { id } = useParams();
  const [obra, setObra] = useState({});
  const [opcionesFunciones, setOpcionesFunciones] = useState([]);
  const [funcion, setFuncion] = useState({});
  const [asientos, setAsientos] = useState([]);
  const [compra, setCompra] = useState([]);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const tokenCliente = sessionStorage.getItem("token");
  let clienteId = "";
  if (tokenCliente) {
    try {
      const decoded = jwtDecode(tokenCliente);
      clienteId = decoded._id; // Se extrae el _id del payload
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  // Actualiza la selección desde el <Select>
  const handleSeatsChange = (values) => {
    setSelectedSeats(values);
  };

  // Callback para cuando se hace clic en un asiento del layout
  const handleSeatSelect = (seat) => {
    if (current !== 1) return; // Solo en el paso "Elegir Asientos"
    setSelectedSeats((prevSelected) => {
      // Toggle: si ya está seleccionado se quita, si no se agrega
      if (prevSelected.includes(seat._id)) {
        return prevSelected.filter((id) => id !== seat._id);
      } else {
        return [...prevSelected, seat._id];
      }
    });
  };

  // Actualizar la vista de compra y total cada vez que cambia la selección
  useEffect(() => {
    let arrayEntradas = [];
    const { entradas, suma } = selectedSeats.reduce(
      (acc, seatId) => {
        const seatOption = asientos.find((s) => s.value === seatId);
        if (seatOption) {
          console.log("Asiento:")
          console.log(seatOption.label);
          console.log(seatId);
          arrayEntradas.push({seatId_ : seatId, seatLabel: seatOption.label          });
          acc.suma += 7500;
          acc.entradas.push(
            <Col span={8} key={seatId}>
              <Card title={obra.name} bordered={false}>
                <p>{funcion.date}</p>
                <p>{seatOption.label}</p>
              </Card>
            </Col>
          );
        }
        return acc;
      },
      { entradas: [], suma: 0 }
    );
    console.log(arrayEntradas)
    setCompra(entradas);
    //const cliente = sessionStorage.getItem('cliente'); // Assuming 'cliente' is stored in session storage
    const carritoData = {
      cliente: clienteId,
      playName: obra.name,
      showId: funcion._id,
      date: funcion.date,
      seats: arrayEntradas,
      precio: suma
    };

    setTotal(carritoData);
  }, [selectedSeats, asientos, obra.name, funcion.date]);

  // Al seleccionar una función, se actualiza 'funcion' y se generan las opciones de asientos
  const handleFuncionChange = (value) => {
    const fetchData = async () => {
      const show = await playsService.getShow(value);
      setFuncion(show);
      return show.seats;
    };

    fetchData().then((seats) => {
      const opciones = seats
        .filter((s) => s.available === true)
        .map((s) => ({
          value: s._id,
          label:
            "Fila: " +
            s.row +
            " | Columna: " +
            s.column +
            " | Tipo de entrada: " +
            s.type +
            " | Precio: 7.500",
        }));
      setAsientos(opciones);
    });
  };

  const steps = [
    {
      title: "Elegir Funcion",
      content: (
        <>
          <Form.Item name="funcion" label="Elija una función:" >
            <Select
              showSearch
              placeholder="Función"
              optionFilterProp="children"
              onChange={handleFuncionChange}
              options={opcionesFunciones}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Elegir Asientos",
      content: (
        <>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%"
            }}
            direction="vertical"
            placeholder="Seleccione asientos"
            value={selectedSeats}
            onChange={handleSeatsChange}
            options={asientos}
          />
        </>
      ),
    },
    {
      title: "Pagar",
      content: (
        <>
          <Row gutter={16}>{compra}</Row>
          <CompraTarjeta data={total} />
        </>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "240px",
    textAlign: "center",
    width: "100%",
    maxWidth: "100%",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `2px dashed ${token.colorBorder}`,
    marginTop: 20,
  };

  // Cargar información de la obra y sus funciones
  useEffect(() => {
    const fetchData = async () => {
      const o = await playsService.getPlayById(id);
      setObra(o);
      return o.performances;
    };
    fetchData().then((performances) => {
      const opciones = performances.map((p) => ({
        value: p._id,
        label: p.date,
      }));
      setOpcionesFunciones(opciones);
    });
  }, [id]);

  return (
    <>
      <Row>
        <Col flex={3}>
          <Steps current={current} items={items} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => {
                const fetchData = async () => {
                  const tkt = await playsService.createTicket(total)
                  console.log(tkt)
                  //const response = await usersService.createUser(values)
                }
                fetchData()

                message.success("Processing complete!")
                //window.location.href = "/admin"
              }}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={prev}>
                Previous
              </Button>
            )}
          </div>
        </Col>
        <Col flex={2}>
          <h1 style={{ textAlign: "center" }}>
            {funcion.date ? "Escenario" : "Elija una función"}
          </h1>
          {/* Se pasa el callback y la selección actual para el cambio de color */}
          <SeatsLayout
            data={funcion}
            onSeatSelect={handleSeatSelect}
            selectedSeats={selectedSeats}
          />
        </Col>
      </Row>
    </>
  );
}

export default ComprarObra;

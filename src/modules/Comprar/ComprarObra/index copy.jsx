import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import playsService from "../../../services/playapi"
import Shows from "../../../components/Shows"
import { Button, message, Steps, theme, Form, Select, Card, Col, Row } from "antd"
import CompraTarjeta from "../../../components/CompraTarjeta"




function ComprarObra() {
  const { id } = useParams()
  const [obra, setObra] = useState([])
  const [opcionesFunciones, setOpcionesFunciones] = useState([])
  const [funcion, setFuncion] = useState({});
  const [asientos, setAsientos] = useState([]);
  const [compra, setCompra] = useState([])
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState();

  const handleSeatsChange = (value, label) => {
    console.log(`selected ${value}`);
    let entradas = []
    let suma = 0;
    label.map((entrada) => {
      suma = suma + 7500;
      entradas.push(
        <Col span={8}>
          <Card title={obra.name} bordered={false}>
            <p>{funcion.date}</p>
            <p>{entrada.label}</p>
          </Card>
        </Col>
      )
      setCompra(entradas)
      setTotal(suma)
    })
  };

  const handleFuncionChange = (value) => {
    const fetchData = async () => {

      const show = await playsService.getShow(value)
      console.log(show)
      setFuncion(show)
      return show.seats
    }

    fetchData().then((show) => {
      let opciones = [];
      show.map((s) => {
        console.log(s)
        opciones.push({
          value: s._id,
          label: "Fila: " + s.row + " | Columna: " + s.column + " | Tipo de entrada: " + s.type + " | Precio: 7.500",
        })
        setAsientos(opciones)
        console.log(opciones)
      })
    })
  };
  const steps = [
    {
      title: 'Elegir Funcion',
      content: <>
        <Form.Item name='funcion' label="Elija una función:" >
          <Select
            showSearch
            placeholder="Función"
            optionFilterProp="children"
            onChange={handleFuncionChange}
            options={opcionesFunciones}
          />
        </Form.Item></>,
    },
    {
      title: 'Elegir Asientos',
      content: <>
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%',
          }}
          placeholder="Please select"
          defaultValue={[]}
          onChange={handleSeatsChange}
          options={asientos}
        /></>,
    },
    {
      title: 'Pagar',
      content: <><Row gutter={16}>{compra}</Row>
        <CompraTarjeta data={total} /></>,
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
    lineHeight: '240px',
    textAlign: 'center',
    width: "94%",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 20,
  };
  useEffect(() => {
    const fetchData = async () => {

      const o = await playsService.getPlayById(id)
      console.log(o)
      setObra(o)
      return o.performances
    }
    let o = fetchData()
    o.then((o) => {
      let opciones = [];
      o.map((p) => {
        opciones.push({
          value: p._id,
          label: p.date,
        })
        setOpcionesFunciones(opciones)
        console.log(opcionesFunciones)
      })
    })

  }
    , [])

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  )
}

function seatsLayout(theater) {
  let row = theater.seats[(theater.seats.length) - 1].row,
    index = 1,
    seats = new Array(row)
  for (let i = 0; i < row; i++) {
    seats[i] = []; // Inicializar cada elemento como un array vacío
  }
  theater.seats.map((seat) => {
    if (seat.row == index) {
      seats[index - 1].push(
        <div key={seat._id} span={4}>
          <Tooltip title={seat.type + " Fila: " + seat.row + " Columna: " + seat.column}>
            <button style={seatStyle} value={seat._id}></button>
          </Tooltip>
        </div>
      )
    } else {
      index++
      seats[index - 1].push(
        <div key={seat._id} span={4}>
          <Tooltip title={seat.type + " Fila: " + seat.row + " Columna: " + seat.column}>
            <button style={seatStyle} value={seat._id}></button>
          </Tooltip>
        </div>
      )
    }
  })

  const rows = Array.from({ length: row }, (_, index) => (
    <div style={rowStyle} key={index} span={4}>
      {seats[index]}
    </div>
  ));

  console.log(rows)
  return (
    <>{rows}</>
  );
}
//<Shows data={{id: obra, performances:shows }}/>
export default ComprarObra

import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography, Select, Row, Col, Tooltip, Divider } from 'antd';
import playsService from '../services/playapi';

const seatStyle = {
    background: '#e6f4f5',
    height: '20px',
    width: '20px',
    margin: '5px',
    borderTopRightRadius: '20px',
    borderTopLeftRadius: '20px',
  };
  const seatStylePlateaBaja = {
    background: '#7ed3f7',
    height: '20px',
    width: '20px',
    margin: '5px',
    borderTopRightRadius: '20px',
    borderTopLeftRadius: '20px',
  };
  const seatStylePlateaAlta = {
    background: '#183af5',
    height: '20px',
    width: '20px',
    margin: '5px',
    borderTopRightRadius: '20px',
    borderTopLeftRadius: '20px',
  };

const rowStyle = {
  display: 'flex',
  justifyContent: 'center'
};

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
};

function UpdateTheater(data) {
  console.log(data);

  // Asignar directamente el array de asientos sin un array anidado
  const values = {
    sala: [{
      name: data.data.sala.name,
      seats: data.data.sala.seats
    }]
  };
  console.log(values);

  function seatsLayout(theater) {
    if (theater && theater.seats && theater.seats.length > 0) {
      console.log(theater);
      
      // Calcular el número máximo de fila basado en los asientos
      const rowCount = Math.max(...theater.seats.map(seat => seat.row));
      
      // Crear un arreglo de filas, cada una como un array vacío
      const seatRows = new Array(rowCount).fill(null).map(() => []);
      
      // Ubicar cada asiento en la fila correspondiente
      theater.seats.forEach((seat) => {
        // Se asume que seat.row es 1-indexado
        seatRows[seat.row - 1].push(
          <div key={seat._id} span={4}>
            <Tooltip title={`${seat.type} Fila: ${seat.row} Columna: ${seat.column}`}>
              <button style={seat.type === 'platea_alta' ? seatStylePlateaAlta : seat.type === 'platea_baja' ? seatStylePlateaBaja : seatStyle} value={seat._id}></button>
            </Tooltip>
          </div>
        );
      });
      
      const rows = seatRows.map((row, index) => (
        <div style={rowStyle} key={index} span={4}>
          {row}
        </div>
      ));
      
      console.log(rows);
      return <>{rows}</>;
    }
    return null;
  }

  const [form] = Form.useForm();

  const onFinish = (formValues) => {
    console.log('Received values of form: ', formValues.sala[0]);
    const fetchData = async () => {
      const response = await playsService.updateTheater(data.data.sala._id, formValues.sala[0]);
      console.log(response);
    };
    fetchData();
    window.location.reload();
  };

  return (
    <>
      <Divider orientation="center">Editar {data.data.sala.name}</Divider>
      <Row>
        <Col flex={2}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            onFinish={onFinish}
            name="dynamic_form_complex"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={values}
          >
            <Form.List name="sala">
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                  {fields.map((field) => (
                    <Card size="small" key={field.key}>
                      <Form.Item label="Nombre de la sala" name={[field.name, 'name']}>
                        <Input />
                      </Form.Item>

                      <Form.Item label="Asientos">
                        <Form.List name={[field.name, 'seats']}>
                          {(subFields, subOpt) => (
                            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                              {subFields.map((subField) => (
                                <Space key={subField.key}>
                                  <Form.Item noStyle name={[subField.name, 'row']}>
                                    <Input placeholder="Fila" />
                                  </Form.Item>
                                  <Form.Item noStyle name={[subField.name, 'column']}>
                                    <Input placeholder="Columna" />
                                  </Form.Item>
                                  <Form.Item noStyle name={[subField.name, 'type']}>
                                    <Select
                                      showSearch
                                      placeholder="Tipo de asiento"
                                      optionFilterProp="children"
                                      options={[
                                        { value: 'platea_baja', label: 'Platea Baja' },
                                        { value: 'platea_alta', label: 'Platea Alta' },
                                        { value: 'general', label: 'General' },
                                      ]}
                                    />
                                  </Form.Item>
                                  <CloseOutlined onClick={() => subOpt.remove(subField.name)} />
                                </Space>
                              ))}
                              <Button type="dashed" onClick={() => subOpt.add()} block>
                                + Add Sub Item
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                    </Card>
                  ))}
                </div>
              )}
            </Form.List>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Actualizar Sala
                </Button>
                <Button onClick={() => window.location.href = '../../admin'}>
                  Volver
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col flex={3}>
          <Typography>
            <Divider orientation="center">ESCENARIO</Divider>
            {seatsLayout(values.sala[0])}
          </Typography>
        </Col>
      </Row>
    </>
  );
}

export default UpdateTheater;



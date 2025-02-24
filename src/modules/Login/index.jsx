import React from 'react';
import { Button, Form, Input, Divider, Row, Col, message } from 'antd';
import usersService from '../../services/userapi';
import RegisterUser from '../../components/RegisterUser';

const onFinish = async (values) => {
  console.log('Success:', values);
  try {
    const response = await usersService.login(values);
    console.log(response);
    window.sessionStorage.setItem("token", response.token);
    message.success('Login exitoso');
    console.log(response);
    if (response.user.role === 'admin') {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error(error);
    message.error('Error en el login, credenciales incorrectas');
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => (
  <>
    <Row>
      <Col flex={2}>
        <Divider orientation="left">Iniciar Sesión</Divider>
        <Form
          name="basic"
          labelCol={{
            span: 16,
          }}
          wrapperCol={{
            span: 8,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 16,
              span: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col flex={3}>
        <Divider orientation="left">Registrarse</Divider>
        <RegisterUser />
      </Col>
    </Row>
  </>
);

export default Login;

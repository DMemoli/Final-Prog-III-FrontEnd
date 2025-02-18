import React from 'react';
import { Button, Form, Input, Divider, Row, Col } from 'antd';
import usersService from '../../services/userapi';
import RegisterUser from '../../components/RegisterUser';
const onFinish = (values) => {
  console.log('Success:', values);
  const fetchData = async () => {
            
    const response = await usersService.login(values)
    console.log(response)
    window.sessionStorage.setItem("token", response.token);
    window.location.href = "/"

}
fetchData()

};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Login= () => (
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
export default Login
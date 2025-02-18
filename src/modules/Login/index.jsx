import React from 'react';
import { Button, Form, Input } from 'antd';
import usersService from '../../services/userapi';

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
);
export default Login
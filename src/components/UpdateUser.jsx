import React, { useState, useEffect } from 'react';
import {
    Button,
    Space,
    Form,
    Input,
    Select,
} from 'antd';
import usersService from '../services/userapi'
const { Option } = Select;
const roles = [
    {
        value: 'admin',
        label: 'Administrador',
    },
    {
        value: 'client',
        label: 'Cliente',
    },
];
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
function updateUser(data) {
    console.log("Update User")
    const userData = data.data.userInfo
    console.log(userData)


    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        const fetchData = async () => {

            const response = await usersService.updateUser(userData._id, values)
            console.log(response)
        }
        fetchData()

        window.location.href = "/usuarios"
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="54">+54</Option>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );


    return (
        <>
            <h1>Actualizar Usuario</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phone: userData.phone,
                    rol: "",
                    prefix: userData.prefix
                    //role: JSON.stringify(datosIniciales.data.role)

                }}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="firstName"
                    label="Nombre"
                    rules={[
                        {
                            type: 'text'
                        },
                        {
                            required: true,
                            message: 'Please input your name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Apellido"
                    rules={[
                        {
                            type: 'text'
                        },
                        {
                            required: true,
                            message: 'Please input your name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Actualizar Usuario
                        </Button>

                        <Button onClick={() => window.location.href = '../../admin'}>
                            Volver
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};
export default updateUser;
import React, { useState } from 'react';
import {
    message,
    Button,
    Cascader,
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
function createUser() {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {


            const response = await usersService.createUser(values)
            console.log(response)
            message.success('Usuario creado exitosamente');
            setTimeout(() => {
                window.location.href = "/admin";
            }, 1000);


        } catch (error) {
            console.error(error);
            message.error('Error al crear el Usuario, '+error);
        }
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
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                //email: datosIniciales.data.email,
                //firstName: datosIniciales.data.firstName,
                //lastName: datosIniciales.data.lastName,
                //role: JSON.stringify(datosIniciales.data.role)

            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

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
                name="rol"
                label="Rol de usuario"
                rules={[
                    {
                        type: 'array',
                        required: true,
                        message: 'Please select role',
                    },
                ]}
            >
                <Cascader options={roles} />
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
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
export default createUser;
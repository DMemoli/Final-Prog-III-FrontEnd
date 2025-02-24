import React, { useState } from 'react';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    message,
} from 'antd';
import usersService from '../services/userapi';

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

function registerUser() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await usersService.createUser(values);
            console.log(response);
            message.success('Usuario registrado exitosamente.');
            // Redirigir al usuario después de 2 segundos
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (error) {
            console.error(error);
            message.error('Hubo un error al registrar el usuario.');
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
            initialValues={{}}
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
                        message: 'El valor ingresado no es un E-mail válido!',
                    },
                    {
                        required: true,
                        message: 'Por favor ingresa tu E-mail!',
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
                        type: 'text',
                    },
                    {
                        required: true,
                        message: 'Por favor ingresa tu nombre',
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
                        type: 'text',
                    },
                    {
                        required: true,
                        message: 'Por favor ingresa tu apellido',
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
                        message: 'Por favor ingresa tu password!',
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
                        message: 'Por favor confirma tu password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Los passwords no coinciden!'));
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
                        message: 'Por favor ingresa tu número de teléfono!',
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

export default registerUser;

import React, { useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import playsService from '../services/playapi';

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
};

function compraTarjeta(total) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const fetchData = async () => {

            const tkt = await playsService.createTicket(total.data)
            console.log(tkt)
            //const response = await usersService.createUser(values)
        }
        fetchData()
        window.location.href = "/admin";
    };

    return (
        <>
            <Divider>Pago con tarjeta de crédito | Total: ${total.data.precio}</Divider>
            <Form
                {...formItemLayout}
                form={form}
                name="compra"
                onFinish={onFinish}
                style={{ maxWidth: 600, margin: 'auto' }}
                scrollToFirstError
            >
                {/* Número de tarjeta de crédito */}
                <Form.Item
                    name="cardNumber"
                    label="Número de Tarjeta de Crédito"
                    rules={[
                        { required: true, message: 'Por favor ingrese su número de tarjeta' },
                        {
                            pattern: /^[0-9]{13,19}$/,
                            message: 'Ingrese un número de tarjeta válido (13-19 dígitos)',
                        },
                    ]}
                >
                    <Input maxLength={19} />
                </Form.Item>

                {/* Nombre Completo */}
                <Form.Item
                    name="name"
                    label="Nombre Completo"
                    rules={[
                        { required: true, message: 'Por favor ingrese su nombre' },
                        {
                            pattern: /^[a-zA-Z\s]+$/,
                            message: 'El nombre solo debe contener letras y espacios',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Fecha de Vencimiento */}
                <Form.Item
                    name="expirationDate"
                    label="Fecha de Vencimiento (MM/YY)"
                    rules={[
                        { required: true, message: 'Ingrese la fecha de vencimiento' },
                        {
                            pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                            message: 'Formato inválido (MM/YY)',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value) return Promise.resolve();
                                const [month, year] = value.split('/');
                                const currentYear = new Date().getFullYear() % 100;
                                const currentMonth = new Date().getMonth() + 1;
                                if (parseInt(year, 10) < currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)) {
                                    return Promise.reject('La tarjeta está vencida');
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input placeholder="MM/YY" maxLength={5} />
                </Form.Item>

                {/* Código de Seguridad */}
                <Form.Item
                    name="securityCode"
                    label="Código de Seguridad (CVV)"
                    rules={[
                        { required: true, message: 'Ingrese el código de seguridad' },
                        {
                            pattern: /^[0-9]{3,4}$/,
                            message: 'El código debe tener 3 o 4 dígitos',
                        },
                    ]}
                >
                    <Input.Password maxLength={4} />
                </Form.Item>

                {/* Botón de Enviar */}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Pagar
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default compraTarjeta;

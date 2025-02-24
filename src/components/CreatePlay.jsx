import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    message,
} from 'antd';
import playsService from '../services/playapi';
import TextArea from 'antd/es/input/TextArea';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
    },
};

function createPlay() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await playsService.createPlay(values);
            console.log(response);
            message.success('Obra creada exitosamente');
            setTimeout(() => {
            window.location.href = "/admin";}, 1000);
        } catch (error) {
            console.error(error);
            message.error('Error al crear la obra, intenta nuevamente');
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="createPlay"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label="Nombre"
                rules={[
                    { type: 'text' },
                    { required: true, message: 'Por favor ingresa el nombre de la obra' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="plot"
                label="Descripción"
                rules={[
                    { type: 'text' },
                    { required: true, message: 'Por favor ingresa la descripción' },
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="cast"
                label="Elenco"
                rules={[
                    { type: 'text' },
                    { required: true, message: 'Por favor ingresa el elenco' },
                ]}
            >
                <TextArea rows={3} />
            </Form.Item>

            <Form.Item
                name="imgName"
                label="Url imagen"
                rules={[
                    { type: 'text' },
                    { required: true, message: 'Por favor ingresa la URL de la imagen' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Crear Obra
                </Button>
            </Form.Item>
        </Form>
    );
}

export default createPlay;

import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Upload,
} from 'antd';
import {
    UploadOutlined,
} from '@ant-design/icons'
import playsService from '../services/playapi'
import TextArea from 'antd/es/input/TextArea';

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
function createPlay() {
    const [form] = Form.useForm();
    const [imageBase64, setImageBase64] = useState(null);

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Maneja el cambio del Upload y convierte el archivo a base64
    const handleFileChange = async (info) => {
        const file = info.file;
        if (!file) return;
        try {
            const base64 = await getBase64(file.originFileObj);
            // Actualizamos el campo "imgName" del formulario con la imagen en base64
            form.setFieldValue('imgName', base64);
            setImageBase64(base64);
        } catch (error) {
            console.error('Error al convertir la imagen a base64', error);
        }
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        const fetchData = async () => {

            const response = await playsService.createPlay(values)
            console.log(response)
        }
        fetchData()

        window.location.href = "/admin"
    };


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
                name="name"
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
                name="plot"
                label="Descripción"
                rules={[
                    {
                        type: 'text'
                    },
                    {
                        required: true,
                        message: 'Please input your plot',
                    },
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="cast"
                label="Elenco"
                rules={[
                    {
                        type: 'text'
                    },
                    {
                        required: true,
                        message: 'Please input your plot',
                    },
                ]}
            >
                <TextArea rows={3} />
            </Form.Item>
            <Form.Item
                name="imgName"
                label="Url imagen"
                rules={[
                    {
                        type: 'text'
                    },
                    {
                        required: true,
                        message: 'Please input your img',
                    },
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
};
export default createPlay;
import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Space,
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
function updatePlay(play) {
    console.log("Update Play")
    const playData = play.data.play
    console.log(playData)

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        const fetchData = async () => {

            const response = await playsService.updatePlay(playData._id, values)
            console.log(response)
        }
        fetchData()

        //window.location.href = "/admin"
    };


    return (
        <>
            <h1>Actualizar Obra</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    plot: playData.plot,
                    name: playData.name,
                    cast: playData.cast,
                    imgName: playData.imgName
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
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Actualizar Obra
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
export default updatePlay;
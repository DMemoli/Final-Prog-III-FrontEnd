import React from 'react';
import { useEffect, useState } from 'react';
import { DatePicker, Form, Button, Select, Space, Input, message } from 'antd';
import playsService from '../services/playapi';

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
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};


function createShow(id) {
    const [theaters, setTheaters] = useState([])
    const [theatersOptions, setTheatersOptions] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const response = await playsService.getTheaters()
            console.log(response)
            return response

        }
        let resp = fetchData()
        resp.then(
            (resp) => {
                setTheaters(resp)
                let teatros = [];
                resp.map((t) => {
                    teatros.push({
                        value: t._id,
                        label: t.name,
                    })
                })
                setTheatersOptions(teatros)
                console.log(teatros)
            }
        )

    }, [])



    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const theater = theaters.find(t => t._id === values['theater_hall']);
            const data = { 'date': values['date'].format(), 'theater_hall': values['theater_hall'], 'seats': theater.seats, 'price_general': values['price_general'], 'price_platea_baja': values['price_platea_baja'], 'price_platea_alta': values['price_platea_alta'] }
            console.log(data)

            const response = await playsService.createShow(id.data, data)
            console.log(response)
            message.success('Función creada exitosamente');
            setTimeout(() => { window.location.href = "/shows/" + id.data; }, 1000);



        } catch (error) {
            console.error(error);
            message.error('Error al crear la funcion, intenta nuevamente');
        }

    };
    return (
        <Form
            name="time_related_controls"
            {...formItemLayout}
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
        >

            <Form.Item name="date" label="Fecha y hora" {...config}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item name='theater_hall' label="Sala:" >
                <Select
                    showSearch
                    placeholder="Sala"
                    optionFilterProp="children"
                    options={theatersOptions}
                />
            </Form.Item>
            <Form.Item
                name="price_general"
                label="Entrada general"
                rules={[
                    {
                        type: 'text'
                    },
                    {
                        required: true,
                        pattern: /^[0-9]{1,9}$/,
                        message: 'Please input a price(number)',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="price_platea_baja"
                label="Entrada P. Baja"
                rules={[
                    {
                        type: 'text'
                    },
                    {
                        required: true,
                        pattern: /^[0-9]{1,9}$/,
                        message: 'Please input a price(number)',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="price_platea_alta"
                label="Entrada P. Alta"
                rules={[
                    {
                        type: 'text'
                    },
                    {
                        required: true,
                        pattern: /^[0-9]{1,9}$/,
                        message: 'Please input a price(number)',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                }}
            ><Space>
                    <Button type="primary" htmlType="submit">
                        Crear show
                    </Button>
                    <Button onClick={() => window.location.href = '../../admin'}>
                        Volver
                    </Button>
                </Space>
            </Form.Item>

        </Form>)

};
export default createShow;
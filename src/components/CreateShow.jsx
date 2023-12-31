import React from 'react';
import { useEffect, useState } from 'react';
import { DatePicker, Form, Button, Select } from 'antd';
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



    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const data = { 'date': values['date'].format(), 'theater_hall': values['theater_hall'], 'seats': theaters[0].seats }
        console.log(data)
        const fetchData = async () => {
            const response = await playsService.createShow(id.data, data)
            console.log(response)

        }
        fetchData()
        console.log(id.data)
        window.location.href = "/shows/" + id.data


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
            >
                <Button type="primary" htmlType="submit">
                    Crear show
                </Button>
            </Form.Item>

        </Form>)

};
export default createShow;
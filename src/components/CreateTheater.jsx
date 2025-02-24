
import React from 'react';
import { Button, Form, Input, message } from 'antd';
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
function createTheater() {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            let seats = parseSeats(values)
            let data = []
            data.push({
                "name": values.name,
                "seats": seats

            })
            const response = await playsService.createTheater(data)
            console.log(response)
            message.success('Sala creada exitosamente');
            setTimeout(() => {
                window.location.href = "/admin";
            }, 1000);
            window.location.reload();
        } catch (error) {
            console.error(error);
            message.error('Error al crear la sala, intenta nuevamente');
        }

    };
    return (

        <Form
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 18,
            }}
            form={form}
            onFinish={onFinish}
            name="dynamic_form_complex"
            style={{
                maxWidth: 600,
            }}
            autoComplete="off"
            initialValues={{
                sala: [{}],
            }}
        >
            <Form.Item label="Nombre de la sala" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Asientos Generales" name="general"></Form.Item>
            <Form.Item label="Filas" name="filasGeneral">
                <Input />
            </Form.Item>
            <Form.Item label="Columnas" name="columnasGeneral">
                <Input />
            </Form.Item>
            <Form.Item label="Platea Baja" name="general"></Form.Item>
            <Form.Item label="Filas" name="filasBaja">
                <Input />
            </Form.Item>
            <Form.Item label="Columnas" name="columnasBaja">
                <Input />
            </Form.Item>
            <Form.Item label="Platea Alta" name="general"></Form.Item>
            <Form.Item label="Filas" name="filasAlta">
                <Input />
            </Form.Item>
            <Form.Item label="Columnas" name="columnasAlta">
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Crear Sala
                </Button>
            </Form.Item>
        </Form>
    );
};

function parseSeats(values) {
    let seats = [];
    console.log(values)
    if (values.columnasGeneral > 0 && values.filasGeneral > 0) {
        for (let i = 1; i <= parseInt(values.filasGeneral); i++) {
            for (let j = 1; j <= parseInt(values.columnasGeneral); j++) {
                seats.push({
                    "row": i.toString(),
                    "column": j.toString(),
                    "type": "general"
                });
            }
        }
    }
    if (values.columnasBaja > 0 && values.filasBaja > 0) {
        for (let i = 1; i <= parseInt(values.filasBaja); i++) {
            for (let j = 1; j <= parseInt(values.columnasBaja); j++) {
                seats.push({
                    "row": (i + parseInt(values.filasGeneral)).toString(),
                    "column": j.toString(),
                    "type": "platea_baja"
                });
            }
        }
    }
    if (values.columnasAlta > 0 && values.filasAlta > 0) {
        for (let i = 1; i <= parseInt(values.filasAlta); i++) {
            for (let j = 1; j <= parseInt(values.columnasAlta); j++) {
                seats.push({
                    "row": (i + parseInt(values.filasGeneral) + parseInt(values.filasBaja)).toString(),
                    "column": j.toString(),
                    "type": "platea_alta"
                });
            }
        }
    }
    return seats
}

export default createTheater;
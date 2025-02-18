import React, { useState, useEffect } from 'react';
import { Layout, theme, FloatButton, Carousel, Button, Popover, Divider } from 'antd';
import {
  ShoppingCartOutlined,
  ShoppingTwoTone,
} from '@ant-design/icons';
import playsService from '../services/playapi';
import { jwtDecode } from "jwt-decode"
const { Sider, Content } = Layout;
const contentStyle = {
  height: '90vh',
  width: '100vw',
  color: '#ff0',
  lineHeight: '240px',
  textAlign: 'center',
  background: '#000000',
};
const textStyle = {
  textAlign: 'center',
  position: 'absolute',
  margin: '1vh'
};

const Billboard = () => {
  const imgUrl = 'http://localhost:2000/src/img/';
  const [collapsed, setCollapsed] = useState(true);
  const [obra, setObra] = useState([]);
  const [id, setId] = useState("");
  const [plays, setPlays] = useState([]);
  const [shows, setShows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await playsService.getPlays()
      console.log(response)
      setPlays(response)
      setId(response[0]._id)
      setObra(response[0])
    }
    fetchData()
    console.log(JSON.stringify(plays))
  }, [])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (


    <Layout>
      <Layout>

        <Content
          style={{
            minHeight: 100,
            height: "90vh",
            background: colorBgContainer,
          }}
        ><FloatButton
            type="text"
            icon={<ShoppingTwoTone />}
            onClick={() => window.location.href = "/comprar/obra/"+id}
            tooltip={<div>Comprar</div>}
            style={{
              fontSize: '20px',
              width: 80,
              height: 80,
              right: 95,
            }}
          />
          <Carousel autoplay={collapsed} afterChange={(n) => {setId(plays[n]._id); setObra(plays[n]); setShows(plays[n].performances)}}>
            {plays.map((x) =><div>
              <div style={textStyle}>
              <Popover  content={<div>
              <p>Titulo: </p>
              <h1>{x.name}</h1>
              <p>Trama: </p>
              <h3>{x.plot}</h3>
              <p>Elenco: </p>
              <h2>{x.cast}</h2>
              </div>} tittle={x.name}>
              <Button>Más Información</Button>
              </Popover>
              </div>
              <img style={contentStyle} src={new URL(imgUrl+x.imgName).href}></img>
            </div>) }

          </Carousel>
        </Content>
        </Layout>
    </Layout>
  );
}; 
export default Billboard;
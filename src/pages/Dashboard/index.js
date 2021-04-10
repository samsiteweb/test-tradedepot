import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import ProductCard from '../../components/ProductCard'
import { BaseUrl } from '../../http'
import NavBar from '../../components/NavBar'
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom'

const ProductName = styled.div`
width: 190px;
font-size: 12px;
padding: 10px;
font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardTitle = styled.div`
font-size: 20px;
color: black;
font-weight: bolder;
text-align: center;

`
const CardSub = styled.div`
font-size: 15px;
text-align: center;

`

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [userProfile, setUser] = useState('');
  const [call, setCall] = useState(1);

  const [product, setProducts] = useState([]);
  
  const handleProd = (prod) => {
    // console.log(prod, "prod"
    setProducts([...prod])
    console.log(product)
  }

  const fetchProducts = async () => {
    setIsLoading(true)
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token)
    
     let api = `${BaseUrl}/product/getProductByLocation`
     axios.get(api, {
    headers: {
        AUTHORIZATION: `Bearer ${user.token}`,  
    }
     }).then((res) => {
       setProducts(res.data.data)
     })
     setIsLoading(false)
    
    // console.log(getProd)
   
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
  setToken(user.token)
  setUser(user.user)
    fetchProducts()
   
   }, [])
  

  const onFinish = async(values: any) => {
    setIsLoading(true)
    let api = `${BaseUrl}/product/getProductByLocation`
    axios.get(api, {
   headers: {
       AUTHORIZATION: `Bearer ${token}`,  
      },
      params: {
        distance: values.distance
      }
    }).then((res) => {
      setProducts(res.data.data)
      setIsLoading(false)
   })
   
   
   
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <NavBar user={userProfile} />
        <Row justify="center" style={{padding: "50px"}} align="middle">
        <Col span={{ xs: 24, sm: 24, md: 24, lg: 32 }} >
          {/* <div >Trade Depot</div> */}
          <div style={{marginBottom: '20px'}}>
             <Link to={"/upload"}><Button type="primary" shape="round" >+ Upload products</Button></Link> 
          </div>
          <div>
      <Form style={{display: 'flex', flexDirection: 'row', width: '70%' }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
            >
              
      <Form.Item label="See products within :" name="distance" rules={[{ required: false,}]}>
        <Input placeholder="10km" />
              </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item >
      </Form>

          </div>
          <div style={{ display: 'flex', flexWrap:'wrap', justifyContent: 'space-between' }}>
            {
              product.map((prod, i) => {
               return <ProductCard prod={prod} key={i} />
              })
            }
          {/* <ProductCard />
          <ProductCard /> */}
          </div>
       </Col>
      </Row>
      </>
  );
};

export default Dashboard
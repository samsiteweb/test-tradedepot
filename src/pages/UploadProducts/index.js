import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { BaseUrl } from '../../http'
import axios from 'axios';
import NavBar from '../../components/NavBar'
const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
border-radius: 10px;
transition: 0.3s;
width: 100%;
padding: 10px;
&.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
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
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};



const UploadProduct = () => {

const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [userProfile, setUser] = useState('');
const [call, setCall] = useState(1);
const [product, setProducts] = useState([]);
const fetchMyProducts = async () => {
  
  setIsLoading(true)
  const user = JSON.parse(localStorage.getItem('user'));
  setToken(user.token)
   let api = `${BaseUrl}/product/userProducts`
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

  const uploadAProduct = async (details) => {
    setIsLoading(true)
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token)
    setUser(user.user)
     let api = `${BaseUrl}/product/create`
     axios.post(api,details, {
    headers: {
        AUTHORIZATION: `Bearer ${user.token}`,  
    }
     }).then((res) => {
       let allProducts = [...product]
        allProducts.push(res.data.data)
       setProducts(allProducts)
       setIsLoading(false)
       console.log(res, "response")
     }).catch(err => {
       console.log(err)
       setIsLoading(false)
     })
     
  }
  
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  setToken(user.token)
  setUser(user.user)
  fetchMyProducts()
 
 }, [])

  const onFinish = (values: any) => {
    uploadAProduct(values)
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <NavBar user={userProfile}/>
    <Row justify="center" style={{paddingTop: "2%"}} align="middle">
            <Col span={6}>
                <Card>
                    <CardTitle>Upload</CardTitle>
                    <CardSub>Complete the form below to upload your products</CardSub>
                    <Divider type="horizontal" />
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Product Name"
        name="productName"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input />
      </Form.Item>

        <Form.Item
        label="Product Details"
        name="productDetails"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input />
      </Form.Item>      
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input />
        </Form.Item>
      <Form.Item
        label="Image Url"
        name="imgUrl"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input />
      </Form.Item>  
      
      <Form.Item
        label="Product Location"
        name="availableAt"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input />
      </Form.Item>  

      <Form.Item {...tailLayout} >
        <div style={{textAlign: 'center'}}>
        <Button  type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
        </div>
      </Form.Item >
            </Form>
        </Card>
       </Col>
      </Row>

      <Row style={{ padding: "20px" }} justify="center">
        <Col >
          <div style={{ fontWeight: 'bolder', textAlign: 'center' }}>My Products</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {
              product.map((prod, i) => {
               return <ProductCard prod={prod} key={i} />
              })
            }
          </div>
        </Col>
      </Row>
      </>
  );
};

export default UploadProduct
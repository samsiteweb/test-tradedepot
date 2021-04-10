import React, {useState} from 'react'
import styled from "styled-components"
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { Row, Col } from 'antd';
import { BaseUrl } from '../../http'
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom'
import NavBar from '../../components/NavBar'


const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
border-radius: 10px;
transition: 0.3s;
width: 100%;
padding: 20px;
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

const Register = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  
  const onFinish = async(values: any) => {
    setIsLoading(true)
  try {
      let res = await axios.post(`${BaseUrl}/auth/createAccount`, values)
      console.log(res)
      setIsLoading(false)
    history.push("/");
    setIsLoading(false)
} catch (error) {
  setIsLoading(false)
    }
    setIsLoading(false)
};

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <><NavBar/>
      
    
        <Row justify="center" style={{paddingTop: "5%"}} align="middle">
            <Col span={{ xs: 24, sm: 24, md: 24, lg: 32 }}>
                <Card>
                    <CardTitle>Register</CardTitle>
                    <CardSub>Welcome! Complete the form below with the appropriate information</CardSub>
                    <Divider type="horizontal" />
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="First Name"
        name="fName"
        rules={[{ required: true, message: 'Please input your first name !' }]}
      >
        <Input  />
        </Form.Item>

        <Form.Item
        label="Last Name"
        name="lName"
        rules={[{ required: true, message: 'Please input your last (aka Surname) !' }]}
      >
        <Input  />
      </Form.Item>      
      
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Check! This is not a valid email!' }]}
      >
        <Input  />
      </Form.Item>  
      
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Address field cannot be empty' }]}
      >
        <Input  />
      </Form.Item>  
      
      <Form.Item
        label="Phone Number"
        name="mobile"
        rules={[{ required: true, message: 'Phone number is required' }]}
      >
        <Input  />
      </Form.Item> 

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
       <div style={{textAlign: 'center'}}>Already have an account? <Link to="/">Sign In</Link></div>
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
      </>
  );
};

export default Register
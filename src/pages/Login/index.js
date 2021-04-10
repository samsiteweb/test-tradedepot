import React, {useState} from 'react'
import styled from "styled-components"
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { Row, Col } from 'antd';
import {Link, useHistory} from 'react-router-dom'
import { BaseUrl } from '../../http'
import axios from 'axios';
import NavBar from '../../components/NavBar'
const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
border-radius: 10px;
transition: 0.3s;
width: 100%;


padding: 30px;
&.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
},

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

const Login = () => {
 const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
  const [userData, setUser] = useState({});
  const [showError, setShowError] = useState(false)
  const onFinish = async(values: any) => {
        setIsLoading(true)
      try {
          let res = await axios.post(`${BaseUrl}/auth`, values)
          // console.log(res)
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data))
        setIsLoading(false)
        setUser(res.data)
        // console.log(userData, "user data")
        if (res) {
          history.push("/dashboard");
        }
        
    } catch (error) {
        setIsLoading(false)
        setShowError(true)
    }
  
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  return (
      <> 
       <NavBar />
      
        <Row justify="center" style={{paddingTop: "5%"}} align="middle">
            <Col span={{ xs: 24, sm: 24, md: 24, lg: 32 }}>
                <Card>
                    <CardTitle> Sign In</CardTitle>
            <CardSub>Welcome! Enter your credentials to sign in</CardSub>
            {showError &&<div style={{fontSize: '12px', color: 'red', textAlign: 'center'}}>Invaild Credentials</div>}
                    <Divider type="horizontal" />
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
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

      <Form.Item style={{textAlign: "center"}}>
       <div>Don't have an account? <Link to="/reg">Register</Link></div>
      </Form.Item>

      <Form.Item style={{textAlign: "center"}}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item >
    </Form>
        </Card>
       </Col>
      </Row>
      </>
  );
};

export default Login 
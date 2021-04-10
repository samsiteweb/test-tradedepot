import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { Row, Col } from 'antd';
import ProductCard from '../../components/ProductCard'
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
import LOC_ICON from '../../assets/loc_icon.jpg'
import { BaseUrl } from '../../http'
import axios from 'axios';
import NavBar from '../../components/NavBar'
import { formatDistance } from 'date-fns'
const ProductName = styled.div`
width: 100%;
font-size: 12px;
padding: 10px;
text-align: center;
font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



const ProductDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [product, setProduct] = useState();
  const [current, setCurrent] = useState();
  const [userProfile, setUser] = useState('');
  const [comments, setProductComments] = useState([])
  let { id } = useParams();


  const fetchProdDetails = async() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token)
    let api = `${BaseUrl}/product/getProductById?id=${id}`
  let productDetails = await axios.get(api, {
    headers: {
      AUTHORIZATION: `Bearer ${user.token}`,  
     },
  })
    // console.log(productDetails)
    if (productDetails.data.data) {
      fetchComments()
    }
    setProduct(productDetails.data.data)
  }

  const fetchComments = async() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token)
    let api = `${BaseUrl}/comment/${id}`
  let comments = await axios.get(api, {
    headers: {
      AUTHORIZATION: `Bearer ${user.token}`,  
     },
  })
    console.log(comments.data.data.comments)
    setProductComments(comments.data.data.comments)
  }

  const postComment = async(payload) => {
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token)
    let api = `${BaseUrl}/comment/post`
  let comments = await axios.post(api, payload, {
    headers: {
      AUTHORIZATION: `Bearer ${user.token}`,  
     },
  })
    console.log(comments.data.data.comments)
    setProductComments(comments.data.data.comments)
  }

  
  const replyComment = async(payload) => {
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token)
    let api = `${BaseUrl}/comment/reply`
  let comments = await axios.post(api, payload, {
    headers: {
      AUTHORIZATION: `Bearer ${user.token}`,  
     },
  })
    console.log(comments.data.data.comments)
    
    setProductComments(comments.data.data.comments)
  }
  const handleClick = () => {
  
}

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token)
    setUser(user.user)
    fetchProdDetails()
   
   
   }, [])
  const onFinish = (values: any) => {
    postComment({productId:id,comment:values.comment})
    // console.log('Success:', values);
  };
  const onClick = (values: any) => {
    replyComment({ productId: id, commentId: current, comment: values.reply })
    setCurrent('')
      // console.log('Success:', values);
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // let { availableAt } = product
  // let {fName, lName} = createdBy
  return (
    
    <>
       <NavBar user={userProfile}/>
      {
        product &&
        <div >
           <Row justify="center" style={{ padding: "50px" }} align="middle">
        <Col span={{ xs: 8, sm: 10, md: 10, lg: 24 }}  >
       
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center'}}>
            <img style={{width:"100%", maxWidth:"350px", height: 'auto'}}  src={product.imgUrl} alt="product" />
            </div>
         
          <ProductName>{product.productName}</ProductName>
              </div>
                  {/* <CardSub>Welcome! Enter your credentials to sign in</CardSub> */}
                  <Divider style={{ padding: '0px', margin: "0px", borderColor: 'pink' }}
              type="horizontal" orientation="center"><div style={{
                padding: '0px', margin: "0px",
                fontSize: '12px', fontWeight: "bold",
              }}>Product Details</div> </Divider>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{product.productDetails} </div>
       
          <Divider style={{ padding: '0px', margin: "0px", borderColor: 'pink' }} type="horizontal" orientation="center"><div style={{ padding: '0px', margin: "0px", fontSize: '12px', fontWeight: "bold", color: 'red' }}>Price</div> </Divider>
       
          <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: "bolder" }}>₦ {product.price}</div>
            <div style={{display: "flex", flexDirection:"column", alignItems: 'center' }}>
            <img src={LOC_ICON} alt="loc-icon" height="15px" />
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{product.availableAt}</div>
            <div style={{ fontSize: '10px', fontWeight: 'light' }}>Seller: {product.createdBy.fName} {product.createdBy.lName}</div>
            </div>
        </Col>
      </Row>
      <Row  justify="center" style={{ padding: "0px" }} align="middle">
        <Col span={10}>
          <div style={{fontWeight: 'bolder'}}>Comments</div>
        <Form name="basic" onFinish={onFinish}>
                <Form.Item name="comment" label="" rules={[{ required: true, message: 'This field is required' }]} >
        <Input.TextArea />
     
      
                </Form.Item >
                <Button type="primary"  htmlType="submit" loading={false}>
          Post
        </Button>
          </Form>
        </Col>
      </Row>
          {
            comments &&
      <Row justify="center" style={{ padding: "0px" }} align="middle">
            <Col span={10}>
              {
                 comments.map((c) => {
                  return <>
                     <div style={{ background: "#f2f9ff", borderRadius: "20px", padding: "20px" }}>
                      <span style={{ fontWeight: 'bold' }}><i>Comment by: {c.senderInfo.fName} {c.senderInfo.lName}
                      <span style={{color: 'grey', fontSize: "12px"}}> ({formatDistance(new Date(c.createdAt), new Date(), { addSuffix: true })})</span>
                      </i></span> <br></br>
                      {c.comment} <br></br>
                      <span>
                      <Button type="primary" onClick={() => {
                          setCurrent(c._id)
                          
                }} shape="round">Reply</Button>
                      </span>
                     
                    </div>
                    {
                      c._id === current && (
                      <Form  name="reply" onFinish={onClick}>
                      <Form.Item name="reply" label="">
                      <Input.TextArea />                   
                          </Form.Item >
                          <Button type="primary" htmlType="submit" loading={false}>
                        Reply
                      </Button>
                        </Form> )
                    }
                    {
                      c.replys.length !== 0 && (
                        c.replys.map((r) => {
                          return <>
                              <div style={{ background: "#f7f7f7", borderRadius: "20px", marginLeft: "20%", padding: "10px" }}>
                              <span style={{ fontWeight: 'bold' }}><i>Sender: {r.senderInfo.fName} {c.senderInfo.lName}
                              <span style={{color: 'grey', fontSize: "12px"}}> ({formatDistance(new Date(c.createdAt), new Date(), { addSuffix: true })})</span>
                              </i></span> <br></br>
                          {r.reply}
                        </div>
                            </>
                        })
                      
                      )
                    }
          
                    </>
                })
              }
         
          <div>
          
          </div>
      </Col>
      </Row>
      }
        </div>
      }
     
      </>
  );
};

export default ProductDetails
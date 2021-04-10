import React from 'react'
import styled from "styled-components"
import { Divider } from 'antd';
import {Link} from 'react-router-dom'
import LOC_ICON from '../../assets/loc_icon.jpg'
const ProdCard = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
border-radius: 10px;
transition: 0.3s;
width: 200px;
padding: 5px;
height:300px;
display: flex;
flex-direction: column;
justify-content: center;
margin:10px;
:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
`
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
  const ProductCard = ({ prod }) => {
    return (
        <Link to={`/product-details/${prod._id}`}>
            <ProdCard>
              <img height= '150px' alt="product"
                src={prod.imgUrl} />
              <div>
            <ProductName>{ prod.productName}</ProductName>
                </div>
                    {/* <CardSub>Welcome! Enter your credentials to sign in</CardSub> */}
              <Divider  style={{padding: '0px', margin: "0px", borderColor: 'pink' }} type="horizontal" orientation="center"><div style={{padding: '0px', margin: "0px", fontSize: '12px', fontWeight: "bold", color: 'red' }}>Price</div> </Divider>
          <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: "bolder" }}>₦ { prod.price }</div>
              <div style={{display: "flex", flexDirection:"column", alignItems: 'center' }}>
                  <img src={LOC_ICON} alt="loc-icon" height="15px" />
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{prod.location.street} {prod.location.city}</div>
                  {/* <div style={{ fontSize: '10px', fontWeight: 'light' }}>Seller: Odun Lawal</div> */}
              </div>
        </ProdCard>
        </Link>
    );
  };

  export default ProductCard
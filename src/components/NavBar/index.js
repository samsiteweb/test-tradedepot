import React from 'react'
import { Row, Col } from 'antd';
import {Button } from 'antd';
import { Link, useHistory } from 'react-router-dom'

const NavBar = ({ user }) => {
    const history = useHistory();
    const handleClick = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
        history.push("/"); 
    }
    return (
        <Row>
            <Col span={24} style={{padding: '20px', backgroundColor: '#f5faff', display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
               {user && <div style={{fontWeight:'bold'}}><i><span style={{fontWeight: 'bolder'}}>Welcome</span> <br></br>
                {user.fName} {user.lName}</i></div>}
            <div style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: '30px' }}>Trade Depot (Test) <span style={{fontSize: "12px"}}>By: Samuel Lawal</span></div>
                {user && <Button type="primary" shape="round" onClick={handleClick} >Logout</Button>}
                {!user && <Link to={'/reg'} > <Button type="primary" shape="round" onClick={handleClick} >Register</Button></Link>}
            </Col>
        </Row>
    );
  };

  export default NavBar
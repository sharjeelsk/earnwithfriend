import React,{useEffect,useState} from 'react'
import "./Dashboard.scss"
import {connect} from 'react-redux'
import axios from 'axios'

import Profile from '../../Images/busman.jpg'
import {GiReceiveMoney} from 'react-icons/gi'
import {FaRegMoneyBillAlt} from 'react-icons/fa'
import {BiWallet} from 'react-icons/bi'
import Dashhead from '../Dashhead/Dashhead'
var jwt = require('jsonwebtoken');
const Dashboard = (props) => {
    const [data, setData] = useState({message:""})
    var decoded = jwt.decode(props.isLoggedIn);
    const getUsersData = async ()=>{
        let response = await axios.post("/user/getlogindata",{email:decoded.email})
        setData(response.data)
    }
    useEffect(() => {
        getUsersData()
        //get data
    }, [])
    const sendDataToAdmin = async ()=>{
      let response = await axios.post("/user/sendbankdetails",{email:decoded.email})
      console.log(response)
      if(response.data){
        setData({...data,message:response.data})
      }
    }
    return (
    <div style={{textAlign:"center"}}>
            <Dashhead />
            <h1 class="dashh1">Welcome, {data.name}</h1>
            {/* <img class="dashprof" src={Profile} alt="profile" /> */}


            <div class="row pngcolms" >
        <div class="col-4">
          <FaRegMoneyBillAlt class="dashicons" />
        <h2 class="dashh2">TOTAL BONUS EARNED</h2>
</div>

<div class="col-4">
  <GiReceiveMoney class="dashicons" />
    <h2 class="dashh2">TOTAL COMMISSION EARNED</h2>
</div>

<div class="col-4">
  <BiWallet class="dashicons" />
    <h2 class="dashh2">WALLET</h2>
</div>
</div>

<div class="row pngcolms2">
  <div class="col-4">
  <p class="dashp">${data.bonus}</p>

  </div>
  <div class="col-4">
  <p class="dashp">${data.commission}</p>
    
    </div>
    <div class="col-4">
    <p class="dashp">${data.wallet}</p>
    
    </div>
</div>



<p>Your Referral Id : {data.referralId}</p>
<h2 class="dashh2" style={{fontWeight:"bold"}}>WITHDRAWABLE AMOUNT: <p class="dashp">${data.wallet}</p></h2>
<span  class="dashspan" onClick={()=>sendDataToAdmin()}>Click here to withdraw full amount</span>
<div>
<span style={{color:"gold"}}> {data.message} </span>
</div>




        </div>
    );
}

const mapStateToProps = ({user})=>{
    return{
        isLoggedIn:user.currentUser
    }
}

export default connect(mapStateToProps)(Dashboard);
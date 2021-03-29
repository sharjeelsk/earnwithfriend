import React from 'react'
import "./Admin.scss"
import Dashhead from '../Dashhead/Dashhead'
import {Link} from 'react-router-dom'
const ListDetail = ({history}) => {
    let data = history.location.state
    return (
        <div>
            <Dashhead />
            <h1 class="h1list">Affiliate Details</h1>
            <div style={{marginTop:"5%"}}>
            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">Name:</span>
            </div>
            <div class="col-6">
            {data.name}
            </div>
            </div>
            </h3>

            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">Mobile No.:</span>
            </div>
            <div class="col-6">
            {data.mobileNo}
            </div>
            </div>
            </h3>

            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">Email:</span>
            </div>
            <div class="col-6">
            {data.email}
            </div>
            </div>
            </h3>

            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">Bank Ac:</span>
            </div>
            <div class="col-6">
            {data.bankaccountno}
            </div>
            </div>
            </h3>

            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">Bank IFSC:</span>
            </div>
            <div class="col-6">
            {data.bankifsc}
            </div>
            </div>
            </h3>

            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">Bank Name:</span>
            </div>
            <div class="col-6">
            {data.bankname}
            </div>
            </div>
            </h3>

            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">City:</span>
            </div>
            <div class="col-6">
            {data.city}
            </div>
            </div>
            </h3>

            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">State:</span>
            </div>
            <div class="col-6">
            {data.state}
            </div>
            </div>
            </h3>

            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">ReferralId:</span>
            </div>
            <div class="col-6">
            {data.referralId}
            </div>
            </div>
            </h3>

            <h3 class="headlist">
            <div  class="row listdetailrow">
            <div class="col-6">
            <span class="spanlist">Amount to be Paid :</span>
            </div>
            <div class="col-6">
            {data.wallet}
            </div>
            </div>
            </h3>
            </div>

            <a  rel="noreferrer" target="_blank" href='https://paytm.com/' class={`head btn-grad`}  style={{margin: "5% 45% 0 45%",color:"black", padding:"1% 3%",display:"block"}}>Pay</a>
        <div style={{textAlign:"center", margin:"2% 0"}}>
        <Link to="/admin">click to go to admin dashboard</Link>
        </div>
        </div>
    );
}

export default ListDetail;
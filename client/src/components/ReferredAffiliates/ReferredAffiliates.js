import React,{useState} from 'react'
import "./ReferredAffiliates.scss"
import {connect} from 'react-redux'
import axios from 'axios'
import Dashhead from '../Dashhead/Dashhead'
var jwt = require('jsonwebtoken');


const ReferredAffiliates = ({isLoggedIn}) => {
    const [data,setData] = useState([])
   
    React.useEffect(() => {
    var decoded = jwt.decode(isLoggedIn);

      const getData = async ()=>{
        let response = await axios.post("/user/getreferreddata",{email:decoded.email})
        setData(response.data)
    }
        getData()
    }, [])
    return (
        <div style={{textAlign:"center"}}>
     <Dashhead />
        <h1 class="dashh1">Referred Affiliates</h1>
{console.log("----------------data",data)}
<div class="ref">
        <table class="ui inverted table ref">
  <thead>
    <tr>
      <th>Sr No.</th>
      <th>Name</th>
      <th>Bonus</th>
    </tr>
  </thead>
  <tbody>
{
  data.length!==0?(
    data.map(e=><tr><td>{e.sr}</td><td>{e.refname}</td><td>{e.bonus}</td></tr>)
  ):null
}
  </tbody>
  <tfoot>
    <tr><th><b>Total : {data.length}</b></th>
    <th></th>
    <th></th>
  </tr></tfoot>
</table>
</div>
    


    </div>
    );
}

const mapStateToProps = ({user})=>{
  return{
      isLoggedIn:user.currentUser
  }
}

export default connect(mapStateToProps)(ReferredAffiliates);
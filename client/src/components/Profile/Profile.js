import React from 'react'
import "./Profile.scss"
import Dashhead from '../Dashhead/Dashhead'
import { useForm } from "react-hook-form";
import _ from 'lodash'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
var jwt = require('jsonwebtoken');


const Profile = (props) => {
    const [state,setState] = React.useState({loading:false,message:""})
    const { register, errors, handleSubmit } = useForm();
    var decoded = jwt.decode(props.loggedInUser);
    console.log(decoded)
  let submit = async values => {
    // print the form values to the console
    console.log(values)
    console.log(props.loggedInUser);
   setState({loading:true,message:""})
    const response = await axios.post("/user/sendprofile",{email:decoded.email,values}) 
    console.log(response);
    if(response){
      setState({loading:false,message:"Successfully Updated"})
       //props.history.push("/dashboard")
    }
  }
    return (
        <div >
            <Dashhead />
            <div>
            <h1 class="signupheader" style={{marginTop:"3%"}}>Edit Profile</h1>
            <form onSubmit={handleSubmit(submit)}>
            <div class="row signupdiv ">
             {/* selectpackage
             sponser ids
             sponser name
             name , mobile nubmer, address ,email , state, city ,pass, confirm pass ...amount toatal    */}
            <br></br>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
           <label class="signuplabel">
            Bank Account Number
           </label>
           <input name="bankaccountnumber" class="signupinput" placeholder="Enter Your Bank Account Number" type="text"  ref={register({ required: true })} />
            {errors.bankaccountnumber? <div class="ui pointing red basic label">Bank Account Number is required</div>:null}
           </div>

             <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
           <label  class="signuplabel">
               Mobile Number
           </label>
           <input name="number" class="signupinput"  type="text" placeholder="Enter Your Mobile Number" ref={register({pattern:/^[0-9]+$/, required:true})} />
           {errors.number ?  <div class="ui pointing red basic label">Mobile Number is Invalid</div>:null}
           </div>

             <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
             <label  class="signuplabel">
             Bank IFSC code
             </label>
             <input name="bankifsc" class="signupinput" placeholder="Enter Your bank ifsc" type="text"  ref={register({ required: true })} />
            {errors.bankifsc?  <div class="ui pointing red basic label">IFSC Code is required</div>:null}
             </div>

             <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
             <label  class="signuplabel">
             Bank Name
             </label>
             <input name="banksname" class="signupinput" placeholder="Enter Your bank's name" type="text"  ref={register({ required: true })} />
            {errors.banksname?  <div class="ui pointing red basic label">Bank Name is required</div>:null}
             </div>


           <div class="col-12">
             {state.message==="Successfully Updated"?
             <div style={{textAlign:"center",marginTop:"4%"}}>
              <br />
             <span style={{color:"green", marginBottom:"4%"}}>{state.message}</span>
             <br />
             <Link to="/dashboard">Click to go to dashboard</Link>
             </div>
             :null
             }
               {_.isEmpty(errors)?(state.loading?
               
            <div class="ui active inverted dimmer"  style={{backgroundColor:"inherit",margin: "10% auto 0 auto",position:"relative" ,padding:"1% 3%",display:"block"}}>
                 <div class="ui tiny text loader"></div>
             </div>
               :<button type="submit" class={`head btn-grad`} style={{margin: "5% auto 0 auto", padding:"1% 3%",display:"block"}}>Register</button>):
               <button type="submit" class={`head btn-grad`} disabled style={{margin: "5% auto 0 auto", padding:"1% 3%",display:"block",background:"lightgrey"}}>Register</button>

                }
           </div>
            
            </div>
            
            </form>
        </div>
        </div>
    );
}


const mapStateToProps = ({user})=>{
return {
  loggedInUser:user.currentUser
}
}

export default connect(mapStateToProps)(Profile);
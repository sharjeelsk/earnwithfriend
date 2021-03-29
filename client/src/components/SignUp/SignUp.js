import "./SignUp.scss"
import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useForm } from "react-hook-form";
import _ from 'lodash'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {setCurrentUser,setLoading} from '../redux/actions/userActions'
import {connect} from 'react-redux'
let SignUp = (props) => {
    const [state,setState] = React.useState("")
    const { register, errors, handleSubmit } = useForm();
  let submit = async values => {
    // print the form values to the console
    if(values.Password === values.ConfirmPassword){
        props.setLoading(true)
        const response = await axios.post("/user/signup",values) 
        console.log("sdfssssssssssssssssssssssssssssssssss",response.data.message);
        props.setLoading(false)
        if(response.data.message==="User Already Exists"){
            console.log("in iffffffffffffffffffffffff")
        setState(response.data.message)
    }
  
    }else{
        setState("Password and Confirm Password should be the same")
    }
//     if(response){
//    props.history.push("/payments")
//     }
  //  setState("There was an error while validating the data")
  }
  //validation code starts here----------------------------------------------------------


  //validation code ends here -----------------------------------------------------------
    return (
        <div>
            <Header id="3" />
            <h1 class="signupheader">Membership</h1>
            <form onSubmit={handleSubmit(submit)}>
            <div class="row signupdiv ">
             {/* selectpackage
             sponser ids
             sponser name
             name , mobile nubmer, address ,email , state, city ,pass, confirm pass ...amount toatal    */}
            <br></br>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
           <label class="signuplabel">
               Name
           </label>
           <input name="firstName" class="signupinput" placeholder="Enter Your Name" type="text"  ref={register({ required: true })} />
            {errors.firstName? <div class="ui pointing red basic label">First name is required</div>:null}
           </div>

             <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
           <label  class="signuplabel">
               Mobile Number
           </label>
           <input name="number" class="signupinput"  type="text" placeholder="Enter Your Mobile Number" ref={register({pattern:/^[0-9]+$/, required:true})} />
           {errors.number ?  <div class="ui pointing red basic label">Mobile Number is Invalid</div>:null}
           </div>

             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
             <label  class="signuplabel">
                 Address
             </label>
             <input name="address" class="signupinput" placeholder="Enter Your Address" type="text"  ref={register({ required: true })} />
            {errors.address?  <div class="ui pointing red basic label">Address is required</div>:null}
             </div>

             <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
             <label  class="signuplabel">
                 Email
             </label>
             <input name="email" class="signupinput" placeholder="Enter Your Email" type="text"  ref={register({pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })} />
            {errors.email  ?  <div class="ui pointing red basic label">Invalid Email</div>:null}
           </div>

           <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
           <label  class="signuplabel">
               Age
           </label>
           <div>
           <input name="age" class="signupinput" placeholder="Enter Your Age" type="number"  ref={register({ required: true })} />
            {errors.age ?  <div class="ui pointing red basic label">Age is required</div>:null}
            </div>
           </div>

           <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
           <label  class="signuplabel">
                 State
             </label>
             <input name="state" class="signupinput" placeholder="Enter Your State" type="text"  ref={register({ required: true })} />
            {errors.state?  <div class="ui pointing red basic label">State is required</div>:null}
           </div>

           <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
           <label  class="signuplabel">
                 City
             </label>
             <input name="City" class="signupinput" placeholder="Enter Your City" type="text"  ref={register({ required: true })} />
            {errors.City?  <div class="ui pointing red basic label">City is required</div>:null}
           </div>


<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label  class="signuplabel">
                 Password
             </label>
             <input name="Password" class="signupinput" placeholder="Enter Your Password" type="text"  ref={register({ required: true })} />
            {errors.Password ?  <div class="ui pointing red basic label">Password is required</div>:null}
           </div>


           <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
           <label  class="signuplabel">
                 ConfirmPassword
             </label>
             <input name="ConfirmPassword" class="signupinput" placeholder="Enter Your Confirmed Password" type="text"  ref={register({ required: true })} />
            {errors.ConfirmPassword ?  <div class="ui pointing red basic label">Confirm is required</div>:null}
           </div>

           <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
           <label  class="signuplabel">
               Enter the referral ID of your friend (Not mendatory)
           </label>
           <input class="signupinput" name="referralId"  type="text" placeholder="Referal Code" ref={register({required:true})} />
           </div>

           <div class="col-12">
           <div style={{textAlign:"center",marginTop:"4%"}}>
           <span style={{color:"red"}}>{state}</span>
           </div>
               {_.isEmpty(errors)?(props.loading?
               
            <div class="ui active inverted dimmer"  style={{backgroundColor:"inherit",margin: "10% auto 0 auto",position:"relative" ,padding:"1% 3%",display:"block"}}>
                 <div class="ui tiny text loader"></div>
             </div>
               :<button type="submit" class={`head btn-grad`}  style={{margin: "5% auto 0 auto", padding:"1% 3%",display:"block"}}>Register</button>):
               <button type="submit" class={`head btn-grad`} disabled style={{margin: "5% auto 0 auto", padding:"1% 3%",display:"block",background:"lightgrey"}}>Register</button>

                }

           <div style={{textAlign:"center",marginTop:"2%"}}>
               <Link class="link"  to="/login">Already a user logIn instead</Link>
           </div>
           </div>
           {console.log("ssssssssssssssssstatetetetetete",state)}
           



            </div>
            
            </form>
            <Footer />
        </div>
    );
}

const mapStateToProps=({user})=>{
    return {
        loading:user.loading
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        CurrentUser:(token)=>dispatch(setCurrentUser(token)),
        setLoading:(value)=>dispatch(setLoading(value))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
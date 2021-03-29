import React from 'react'
import "./LogIn.scss"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useForm } from "react-hook-form";
import _ from 'lodash'
import axios from 'axios';
import {setCurrentUser,setLoading} from '../redux/actions/userActions'
import {connect} from 'react-redux'

const Login = (props) => {
    const [state, setState] = React.useState("")
    const { register, errors, handleSubmit } = useForm();
    let submit = async values => {
      // print the form values to the console
        props.setLoading(true)
      const response = await axios.post("https://earnwithfriendsapi.herokuapp.com/user/login",{
          email:values.email,
          Password:values.Password
      })
      console.log(response)
      props.setLoading(false)
      if(response.status ===200 && response.data.message ==="Auth Success Admin"){
          console.log(response.data.token)
          props.CurrentUser(response.data.token)
          props.history.push("/admin")   
      }
      
      else if(response.status ===200 && response.data.message ==="Auth Success"){
        console.log(response.data.token)
        props.CurrentUser(response.data.token)
        props.history.push("/dashboard")   
    }
      else{
          setState(response.data.message);
      }
    }
    return (
        <div>
              <Header id="3" />
              <h1 class="signupheader">LogIn</h1>
        <div className="signupdiv">
        <form onSubmit={handleSubmit(submit)}>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
             <label  class="signuplabel">
                 Email
             </label>
             <input name="email" class="signupinput" placeholder="Enter Your Email" type="text"  ref={register({pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })} />
            {errors.email  ?  <div class="ui pointing red basic label">Invalid Email</div>:null}
           </div>


           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <label  class="signuplabel">
                 Password
             </label>
             <input name="Password" class="signupinput" placeholder="Enter Your Password" type="text"  ref={register({ required: true })} />
            {errors.Password ?  <div class="ui pointing red basic label">Password is required</div>:null}
           </div>

           <div class="col-12">
           <div style={{textAlign:"center",marginTop:"4%"}}>
           <span style={{color:"red"}}>{state}</span>
           </div>
               {_.isEmpty(errors)?(props.loading?
               
            <div class="ui active inverted dimmer"  style={{backgroundColor:"inherit",margin: "10% auto 0 auto",position:"relative" ,padding:"1% 3%",display:"block"}}>
                 <div class="ui tiny text loader"></div>
             </div>
               :<button type="submit" class={`head btn-grad`}  style={{margin: "5% auto 0 auto", padding:"1% 3%",display:"block"}}>LogIn</button>):
               <button type="submit" class={`head btn-grad`} disabled style={{margin: "5% auto 0 auto", padding:"1% 3%",display:"block",background:"lightgrey"}}>LogIn</button>

                }
           </div>

        <div>
        </div>

        </form>

        </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(Login);
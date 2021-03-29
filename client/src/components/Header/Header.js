import React from 'react'
import "./Header.scss"
import {Link} from 'react-router-dom'
import logo from '../../Images/EARNWITHFRIENDLOGO.jpg'
import {connect} from'react-redux'
import {setCurrentUserNull} from '../redux/actions/userActions'
const Header = (props) => {
	console.log(props)
	return (
        <nav class={`navbar navbar-expand-md navbar-light bg-light navbarclass ${props.sticky}`} >
	<div class="container-fluid">
		<a class="navbar-brand"  style={{color:"white"}} href="/"><img class="logo" src={logo} alt="logo" /></a>
	<button style={{color:"gold"}} class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
		<span style={{color:"gold"}}  class="navbar-toggler-icon" ></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarResponsive">
		<ul class="navbar-nav ml-auto" id="nav">
			<li class="nav-item">
				{props.id==="1"?<Link  class="nav-link" style={{color:"gold"}} to="/">Home</Link>:<Link  class="nav-link" style={{color:"goldenrod "}} to="/">Home</Link>}
			</li>
			<li class="nav-item">
			{props.id==="2"?<Link  class="nav-link" style={{color:"gold"}} to="/about">About</Link>:<Link  class="nav-link" style={{color:"goldenrod "}} to="/about">About</Link>}
			</li>
			<li class="nav-item">
			{props.id==="4"?<Link  class="nav-link" style={{color:"gold"}} to="/services">Services</Link>:<Link  class="nav-link" style={{color:"goldenrod "}} to="/services">Services</Link>}
			</li>
			<li class="nav-item">
			{props.id==="5"?<Link  class="nav-link" style={{color:"gold"}} to="/contactme">Contact Me</Link>:<Link  class="nav-link" style={{color:"goldenrod "}} to="/contactme">Contact Me</Link>}
			</li>
			<li class="nav-item">
			{props.currentUser!=="null"?<Link  class="nav-link" style={{color:"goldenrod "}}   to="/dashboard">Dashboard</Link>:null}
			</li>
			<li class="nav-item">
			{props.id==="3"?null:(
			props.currentUser==="null"?
			<Link class="login btn-grad" style={{fontSize:"1rem"}} to="/signup">Register</Link>
			:
			<Link to="" onClick={()=>props.setUserFalse()} class="login btn-grad" style={{fontSize:"1rem"}}>LogOut</Link>
			)}
			</li>
		</ul>
	</div>
</div>
</nav>
    );
}

const mapDispatchToProps = (dispatch)=>{
	return{
		setUserFalse:()=>dispatch(setCurrentUserNull())
	}
}

const mapStateToProps = ({user})=>{
	return{
		currentUser:user.currentUser,
		loading:user.loading
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
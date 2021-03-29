import './App.scss';
import Home from './components/Home'
import SignUp from './components/SignUp/SignUp'
import LogIn from './components/LogIn/LogIn'
import {Route, Switch} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import About from './components/About/About'
import Services from './components/Services/Services'
import ContactMe from './components/ContactMe/ContactMe'
import ReferredAffiliates from './components/ReferredAffiliates/ReferredAffiliates'
import Profile from './components/Profile/Profile'
import {connect} from 'react-redux'
import Admin from './components/Admin/Admin'
import ListDetail from './components/Admin/ListDetail'
function App(props) {
  console.log(props)
  const renderRoutes = ()=>{
    if(props.currentUser==="null"){
      return (
  <Switch>
<Route path ="/login" component = {LogIn} />
<Route path ="/signup" component = {SignUp} />
</Switch>
      )
    }
  }
  const renderProtectedRoutes = ()=>{
    if(props.currentUser!=="null"){
      return(
        <Switch>
    <Route path = "/dashboard" component={Dashboard} />
    <Route path="/referred" component={ReferredAffiliates} />
     <Route path="/admin" component={Admin} />
     <Route path="/profile" component={Profile} />
     <Route path = "/about" component={About} />
     <Route path="/listdetail" component={ListDetail} />
     <Route path = "/services" component={Services} />
     <Route path = "/contactme" component={ContactMe} />
        </Switch>
      )
    }
  }
  return (
    <Switch>
     <Route exact path ="/" component = {Home} />
    {renderRoutes()}
    {renderProtectedRoutes()}
     <Route path='/payments' component={() => { 
     window.location.href = 'http://localhost:3003/?price=13.80'; 
     return null;
}}/>
    </Switch>
  );
}
const mapStateToProps = ({user})=>{
  return {
    currentUser:user.currentUser
  }
}
export default connect(mapStateToProps)(App);

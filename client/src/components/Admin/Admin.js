import React from 'react'
import "./Admin.scss"
import Dashhead from '../Dashhead/Dashhead'
import axios from 'axios'
const Admin = (props) => {

  const [state, setState] = React.useState([])
  const getUsersData = async ()=>{
    const {data} = await axios.get("/admin/userstopay")
    setState(data)
  }

  React.useEffect(() => {
  getUsersData()
  }, [])

  const deleteUser = (e)=>{
    console.log("in=-dd-de--------------deteetet")
    console.log(e)
    axios.post("/admin/remove",{_id:e._id, email:e.email})
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err);
    })
  }
    return (
        <div style={{textAlign:'center'}}>
            <h1 class="adminh1">Welcome Admin</h1>

            {
        console.log(state)
      }
        <div class="ref">
            <table class="ui inverted table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Payment</th>
      <th>Link</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {
      state.length!==0?state.map(e=>(
        <tr key={e.id}><td>{e.name}</td><td>{e.wallet}</td><td><span class="deletetd" onClick={()=>props.history.push("/listdetail",e)}>link</span></td><td class="deletetd" onClick={()=>deleteUser(e)}>Click To delete</td></tr>
      ))
      :null
    }
  </tbody>
  <tfoot>
    <tr><th>Total : {state.length} People</th>
    <th></th>
    <th></th>
    <th></th>
  </tr></tfoot>
</table>
</div>


            </div>
    );
}

export default Admin;
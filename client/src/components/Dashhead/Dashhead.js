import React from 'react'
import "../Dashboard/Dashboard.scss"
import { BsListUl } from 'react-icons/bs';
import {AiOutlineClose} from 'react-icons/ai'
import {AiFillHome} from 'react-icons/ai'
import {FaUserFriends} from 'react-icons/fa'
import {RiPencilFill} from 'react-icons/ri'
import {ImUsers} from 'react-icons/im'
import { IconContext } from "react-icons";
import {withRouter} from 'react-router-dom'
const Dashhead = (props) => {
    const [state, setState] = React.useState(false)

    return (
        <div class="dashhead">
                <IconContext.Provider
                value={{ color: 'black'}}
                >      
              <div>
               {state?<AiOutlineClose class="iconrotated" onClick={()=>setState(!state)} />:<BsListUl class="icon" onClick={()=>setState(!state)}/>}
               </div>           
               </IconContext.Provider>
                <div class={state?"dashmenuactive":"dashmenu"}>
                    
                <hr class={state?"hractive":"hr"}></hr>
                    <ul>
                        <li  onClick={()=>props.history.push("/dashboard")}><AiFillHome /> Home</li>
                        <hr class="lihr" />
                        <li onClick={()=>props.history.push("/profile")}><RiPencilFill /> Edit Profile</li>
                        <hr class="lihr" />
                        <li><ImUsers /> Transaction's</li>
                        <hr class="lihr" />
                        <li  onClick={()=>props.history.push("/referred")}><FaUserFriends /> Referred Affilates</li>
                    </ul>
                </div>
            </div>
    );
}

export default withRouter(Dashhead);

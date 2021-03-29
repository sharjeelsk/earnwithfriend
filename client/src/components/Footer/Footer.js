import React from 'react'
import "./Footer.scss"
import Aos from "aos"
import "aos/dist/aos.css"
const Footer = () => {
    React.useEffect(()=>{
        Aos.init({duration:500})
      },[])
    return (
        <div class="footer" style={{color:"black"}}>
        <p class="footerpara"  style={{color:"black"}} data-aos="zoom-in-up">
         Enim do sit aute culpa ipsum ad eiusmod officia id. Ad adipisicing proident qui cillum. Ad veniam aute Lorem cupidatat laborum do sunt incididunt commodo veniam laboris ad. Aliquip tempor elit aute nostrud consectetur excepteur nostrud id qui labore. Excepteur ipsum nostrud excepteur nostrud sit in. Ea irure aliquip ea nisi do deserunt Lorem in sit adipisicing in. Officia do aute sint in pariatur cupidatat.
        </p>
        <div>

        </div>
        <p  style={{color:"black"}} class="secondfooterpara">
        Salem,TamilNadu,India. Email: support@earnwithfriend.com
        <br />
Copyright © 2021 EarnWithFriend
        </p>
        </div>
    );
}

export default Footer;
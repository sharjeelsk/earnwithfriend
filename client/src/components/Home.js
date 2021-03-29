import React from 'react'
import Header from './Header/Header'
import "./Home.scss"
import Footer from './Footer/Footer'
import Aos from "aos"
import "aos/dist/aos.css"
import Process from './Process/Process'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Home = () => {
    React.useEffect(()=>{
      Aos.init({duration:500})
      axios.get("/user/test")
      .then(res=>console.log(res))
    },[])

    return (
        <div>

            <div style={{background:"#323232"}}>
            <Header id="1" sticky="sticky-top" />
            <div class="container-fluid hometopdiv">
                <h1 class="head1 header" style={{paddingTop:"5%",color:"#f0a500"}}>Learn Digital Marketing and Earn</h1>
                <h3 class="head2 subheader" style={{}}>A place where courses are provided on digital marketing so you can make money through Affiliate and Digital Marketing</h3>
                <Link to="/about" style={{color:"black",textDecoration:"none"}}> <button  class="head btn-grad" style={{margin: "2%", padding:"1% 3%"}}>Click for more</button></Link>
            </div>
            </div>
            <Process />
            {/* second code segment  */}

            <div class="container-fluid homeseconddiv">
                <h2  class="head3 header" data-aos="fade-up">Profit you'll earn</h2>

                <div class="row subhomeseconddiv">
                
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                   <h1 class="multiples" style={{fontSize:"4rem"}} data-aos="zoom-in-up">1x</h1>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"data-aos="zoom-in-up">
                <h3 class="head4" >THE FIRST PROFIT</h3>
                <p>An Earning of ₹500 will be given for  which you will make for each person you’ve  made, and it is for a single  person who you have made you to Join in for this Earning Process.</p>
                </div>

                </div>
                
                <div class="row subhomeseconddiv">
                
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" data-aos="zoom-in-up">
                   <h1 class="multiples" style={{fontSize:"6rem"}}>2x</h1>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" data-aos="zoom-in-up">
                <h3 class="head4">THE SECOND PROFIT</h3>
                <p>An Earning of ₹500 will be given for  which you will make for each person you’ve  made, and it is for a single  person who you have made you to Join in for this Earning Process.</p>
                </div>

                </div>
                
                <div class="row subhomeseconddiv">
                
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" data-aos="zoom-in-up">
                   <h1 class="multiples" style={{fontSize:"8rem"}}>3x</h1>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" data-aos="zoom-in-up">
                <h3 class="head4">THE THIRD PROFIT</h3>
                <p>An Earning of ₹500 will be given for  which you will make for each person you’ve  made, and it is for a single  person who you have made you to Join in for this Earning Process.</p>
                </div>

                </div>


            </div>

            {/* last div */}
            <h2 class="head5" data-aos="fade-up">OUR ASTONISHING SERVICES</h2>
    <div style={{textAlign:"center"}}>
        <div class="ui cards" >
            <div class="card" style={{margin:"5% auto"}} >
            <div class="content" style={{padding:"20% 10%",color:"#cf7500"}} data-aos="flip-left" data-aos-duration="1000">
            <h3 class="head4" >People's Plan</h3>
            <p class="description" style={{color:"#cf7500"}}>The name indicates that it's the people's plan for them to earn without any difficulties for them to earn with a lot of Benefits; This only for the cause for our customers to earn a lot of how much they need! Click the description below to learn more.</p>
            <div class="ui labeled button" tabIndex="0" style={{marginTop:"10%"}} >
  <div class="ui yellow button">
    <span> BUY</span>
  </div>
  <a href="https://google.com" class="ui basic yellow left pointing label">
  <span>  $ 10</span>
  </a>
</div>
            </div>
            </div>

            <div class="card" style={{margin:"5% auto"}}>
            <div class="content" style={{padding:"20%"}}  data-aos="flip-left"  data-aos-duration="1000">
            <h3 class="head4">Silver-X</h3>
            <p>
            SILVER-X one of the most suitable plan for most people. There is none other than this for a member to earn in a Decent and most Efficient way. We have developed this for the welfare of our customers to do more in their life.
            </p>
            <div class="ui labeled button" tabIndex="0" style={{marginTop:"10%"}}>
  <div class="ui yellow button">
  <span>BUY</span>
  </div>
  <a href="https://google.com" class="ui basic yellow left pointing label" >
  <span>  $ 20</span>
  </a>
</div>
            </div>
            </div>

            <div class="card" style={{margin:"5% auto"}} >
            <div class="content" style={{padding:"20%"}} data-aos="flip-left" data-aos-duration="1000">
            <h3 class="head4">GOLD-X</h3>
            <p>
            GOLD-X as the name indicates it is one of the most astonishing memberships that we are empowering for the use of our generous People to use it a lot and gain more. It has Maximum and Tremendous Offers and Options to gain more.
            </p>
            <div class="ui labeled button" tabIndex="0" style={{marginTop:"10%"}}>
  <div class="ui yellow button">
  <span> BUY</span>
  </div>
  <a href="https://google.com" class="ui basic yellow left pointing label">
  <span>$ 30</span>
  </a>
</div>
            </div>
            </div>
        </div>


        </div>


        <Footer />
        </div>
    );
}

export default Home;






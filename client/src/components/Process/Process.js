import React from 'react'
import "./Process.scss"
import Membership from '../../Images/check.png'
import Group from '../../Images/group (1).png'
import Money from '../../Images/money-bag.png'
const Process = () => {
    return (
        <div class="row processdiv">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <img src={Membership} alt="become a member" class="img1" />
            <h3 class="processheader">STEP 1</h3>
            <p class="processpara">Become a member</p>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <img src={Group} alt="add friends" class="img2" />
            <h3 class="processheader">STEP 2</h3>
            <p class="processpara">Invite Friends with referal code</p>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <img src={Money} style={{marginTop:10}} alt="add money" class="img3" />
            <h3 class="processheader">STEP 3</h3>
            <p class="processpara">Take your money</p>
            </div>
        </div>
    );
}

export default Process;
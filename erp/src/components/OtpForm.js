import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios' 
import PasswordForm from './PasswordForm'

function OtpForm() {
    const emailRef = useRef();
    const [otpForm,showForm] = useState(true)
    const sendOtp = async () =>{ 
        try{
            let url = 'http://localhost:8080/users/email-send'
            let options = {
                method:'POST',
                url:url, 
                data:{email:emailRef.current.value}
            }
            let response = await axios(options) 
            let record = response.data;
            if(record.statusText =='Success'){  
                toast.success(record.message);
                showForm(false); 
            }else{
                toast.error(record.message);
            }
        }catch(e){
            toast.error("Something Went Wrong!");
        }
    }

    return (
        <div className="container">
            <div className="row login">
                <div className="col-md-2">
                </div>
                <div className="col-md-6">
                    <ToastContainer />
                    <h3 className="" style={{ marginTop: '20px' }}>Reset Password</h3><br />
               { otpForm ?    <form autoComplete="off" id="otpForm" method="post" >
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" ref = {emailRef} autoComplete="off"/>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary" onClick={sendOtp} >Send OTP</button>&nbsp;
                            <Link to="/login"> <button type="button" className="btn btn-danger">Back</button></Link>
                        </div>
                    </form>
                    :<PasswordForm email={emailRef.current.value}/>
               }
                </div>
            </div>
        </div>
    )
}

export default OtpForm

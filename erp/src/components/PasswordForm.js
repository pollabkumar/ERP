import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { BiLogIn } from "react-icons/bi";

function PasswordForm(props) {

    const [inputField, setInputField] = useState({
        otpCode: '',
        password: '', 
        cpassword: '',
    })
    const history = useHistory()
    const [errField, setErrField] = useState({

        otpCodeErr: '',
        passwordErr: '',
        cpasswordErr: '',
    })
    const validForm = () => {
        let formIsValid = true;
        setErrField({
            otpCodeErr: '',
            passwordErr: '',
            cpasswordErr: '',
        })
        if (inputField.otpCode == '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, otpCodeErr: 'Please Enter Email'
            }))
        }
        if (inputField.password == '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, passwordErr: 'Please Enter Password'
            }))
        }
        if (inputField.cpassword == '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, cpasswordErr: 'Please Enter Confirm Password'
            }))
        }
        if(inputField.cpassword !='' && inputField.password != inputField.cpassword){
            formIsValid = false 
            setErrField(prevState=>({
                ...prevState,cpasswordErr:'Password are not matched '
            }))
        } 
        return formIsValid
    }
    const inputHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value })
    }

    const submitButton = async () => {
        if (validForm()) {
            Object.assign(inputField,props) 
            let url = 'http://localhost:8080/users/change-password'
            let options = {
                method: 'POST',
                url: url, 
                data: inputField
            }
            try {
                let response = await axios(options)
                console.log(response)
                if (response.data.statusText == 'Success') {
                    toast.success(response.data.message);
                  setTimeout(()=>{
                    history.push('/login')
                  },1500)
                } else {
                    toast.error(response.data.message);
                }
            } catch (e) {
                toast.error("Something Went Wrong!");
            }

        } else {
            toast.error("Form Invalid!");
        }
    }
    const changePassword = async () => {
        history.push('/reset-password')
    }
    return (
        <form autoComplete="off" action="" method="post" >
            <ToastContainer />
            <div className="mb-3">
                <label className="form-label">Otp Code</label>
                <input type="email" className="form-control" name="otpCode" maxLength="4" autoComplete="off" value={inputField.otpCode} onChange={inputHandler} />
                {
                    errField.otpCodeErr.length > 0 && <span className="error">{errField.otpCodeErr}</span>
                }
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" autoComplete="off" value={inputField.password} onChange={inputHandler} />
                {
                    errField.passwordErr.length > 0 && <span className="error">{errField.passwordErr}</span>
                } 
            </div>
            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="cpassword" autoComplete="off" value={inputField.cpassword} onChange={inputHandler} />
                {
                    errField.cpasswordErr.length > 0 && <span className="error">{errField.cpasswordErr}</span>
                } 
            </div>
            <div>
                <button type="button" className="btn btn-primary" onClick={submitButton}>Change Password </button>&nbsp;
                            <Link to="/login"> <button type="button" className="btn btn-success">Back</button></Link>
            </div>
        </form>

    )
}

export default PasswordForm

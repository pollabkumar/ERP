import React,{useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Link,useHistory } from 'react-router-dom';
import { BiLogIn } from "react-icons/bi";

function Login() {

    const [inputField,setInputField] = useState({
        email:'', 
        password:'', 
    })
    const history = useHistory()
    const [errField,setErrField] = useState({
         
        emailErr:'',
        passwordErr:'', 
    })
    const validForm = ()=>{
        let formIsValid = true; 
        setErrField({ 
            emailErr:'',
            passwordErr:'', 
        }) 
        if(inputField.email ==''){
            formIsValid = false
            setErrField(prevState=>({
                ...prevState,emailErr:'Please Enter Email'
            }))
        }  
        if(inputField.password ==''){
            formIsValid = false
            setErrField(prevState=>({
                ...prevState,passwordErr:'Please Enter Password'
            }))
        }  
        return formIsValid 
    }
    const inputHandler =(e)=>{ 
        setInputField({...inputField,[e.target.name]:e.target.value })
    } 

    const submitButton = async ()=>{
        if(validForm()){
            let url = 'http://localhost:8080/users/login'
            let options = {
                method:'POST',
                url:url,
                headers:{

                },
                data:inputField
            }
            try{
                let response = await axios(options)
                console.log(response)
                if(response.data.statusText =='Success'){ 
                    toast.success("Login Successfully");
                    localStorage.setItem('token',response.data.token)
                    setTimeout(()=>{
                        history.push('/home')
                    },1500) 
                }else{
                    toast.error(response.data.message);
                }
            }catch(e){
                toast.error("Something Went Wrong!");
            }
           
        }else{
            toast.error("Form Invalid!");
        }
    }
    const changePassword = async ()=>{  
        history.push('/reset-password') 
    }
    return (
        <div className="container">
            <div className="row login">

                <div className="col-md-2">
                </div>
                <div className="col-md-6">
                <ToastContainer/>
                    <h3 className="" style={{ marginTop: '20px' }}>Login User</h3><br />
                    <form autoComplete="off" action="" method="post" >
                       <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" autoComplete="off"  value={inputField.email} onChange={inputHandler}  />
                            {
                                errField.emailErr.length > 0 && <span className="error">{errField.emailErr}</span>
                            }
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" autoComplete="off"  value={inputField.password} onChange={inputHandler}  />
                            {
                                errField.passwordErr.length > 0 && <span className="error">{errField.passwordErr}</span>
                            }
                           <span className="forget" onClick={changePassword}>Forget Password ?</span>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary" onClick={submitButton}>Login<BiLogIn style={{ fontSize: '22' }} /></button>&nbsp;
                            <Link to ="/registration"> <button type="button"  className="btn btn-success">Add User</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

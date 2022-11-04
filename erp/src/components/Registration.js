import React,{useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Link,useHistory } from 'react-router-dom';


function Registration() {

    const [inputField,setInputField] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        cpassword:'',
        profilePic:''
    })
    const history = useHistory()
    const [errField,setErrField] = useState({
        nameErr:'',
        emailErr:'',
        phoneErr:'',
        passwordErr:'',
        cpasswordErr:''
    })
    const inputHandler =(e)=>{ 
        setInputField({...inputField,[e.target.name]:e.target.value })
    } 

    const imageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];  
          setInputField({...inputField,profilePic: img })
          //setInputField({...inputField,profilePic: URL.createObjectURL(img) })
        }
    }
    const submitButton = async ()=>{
        if(validForm()){ 
 
            const formdata = new FormData();
            formdata.append("myFile",inputField.profilePic,inputField.profilePic.name);
            formdata.append('name',inputField.name); 
            formdata.append('email',inputField.email); 
            formdata.append('phone',inputField.phone); 
            formdata.append('password',inputField.password); 
            formdata.append('cpassword',inputField.cpassword);   

            let url = 'http://localhost:8080/users/add' 
            try{
                let response = await axios.post(url,formdata); ///await axios(options) 
                if(response.status ==200){ 
                    toast.success("Added Successfully");
                    setTimeout(()=>{
                        history.push('/login')
                    },1500)
                }
            }catch(e){
                toast.error("Something Went Wrong!");
            }
           
        }else{
            toast.error("Form Invalid!");
        }
    }
    const validForm = ()=>{
        let formIsValid = true;
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); 
        setErrField({
            nameErr:'',
            emailErr:'',
            phoneErr:'',
            passwordErr:'',
            cpasswordErr:''
        })
        if(inputField.name ==''){
            formIsValid = false
            setErrField(prevState=>({
                ...prevState,nameErr:'Please Enter Name'
            }))
        } 
        if(inputField.email ==''){
            formIsValid = false
            setErrField(prevState=>({
                ...prevState,emailErr:'Please Enter Email'
            }))
        } 
        if(inputField.email !='' && !validEmailRegex.test(inputField.email) ){
            formIsValid = false
            setErrField(prevState=>({
                ...prevState,emailErr:'Please Enter Valid Email'
            }))
        } 
        if(inputField.phone ==''){
            formIsValid = false
            setErrField(prevState=>({
                ...prevState,phoneErr:'Please Enter Phone'
            }))
        } 
        if(inputField.password ==''){
            formIsValid = false
            setErrField(prevState=>({
                ...prevState,passwordErr:'Please Enter Password'
            }))
        } 
        if(inputField.cpassword ==''){
            formIsValid = false
            setErrField(prevState=>({
                ...prevState,cpasswordErr:'Please Enter Confirm Password'
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
    return (
        <div className="container">
            <div className="row login">
            <ToastContainer/>
                <h3 className="heading" style={{ marginTop: '20px' }}>Add Registration</h3><br />

                <div className="col-md-2">
                </div>
                <div className="col-md-6">   
                    
                    <form autoComplete="off" action="/login-user" method="post" >
                        <div className="mb-3">
                            <label className="form-label">User Name</label>
                            <input type="text" className="form-control" name="name"  value={inputField.name} onChange={inputHandler} />  
                            {
                                errField.nameErr.length > 0 && <span className="error">{errField.nameErr}</span>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" autoComplete="off"  value={inputField.email} onChange={inputHandler}  />
                            {
                                errField.emailErr.length > 0 && <span className="error">{errField.emailErr}</span>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text" className="form-control" name="phone" autoComplete="off"  maxLength="10"  value={inputField.phone} onChange={inputHandler}  /> 
                            {
                                errField.phoneErr.length > 0 && <span className="error">{errField.phoneErr}</span>
                            }
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" autoComplete="off"  value={inputField.password} onChange={inputHandler}  />
                            {
                                errField.passwordErr.length > 0 && <span className="error">{errField.passwordErr}</span>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" name="cpassword" autoComplete="off"  value={inputField.cpassword} onChange={inputHandler} />
                            {
                                errField.cpasswordErr.length > 0 && <span className="error">{errField.cpasswordErr}</span>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Upload Profile</label>
                            <input type="file" className="form-control" name="myFile" autoComplete="off" onChange={imageChange}/> 
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary" onClick={submitButton}>Add User 
                            </button>&nbsp;
                            <Link to="/login"><button type="button" id="addUserBtn" className="btn btn-success">Login User</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration

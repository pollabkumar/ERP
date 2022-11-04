import React, { useEffect, useContext,useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import Context from '../store/Context'


function Home() {
   const {state,dispatch} = useContext(Context)
    const history = useHistory()
    const [info,setInfo] = useState({
        name:'',
        email:'',
        phone:''
    })
    const [imagePath,setPath] =  useState('');
    useEffect(async () => {
        let url = 'http://localhost:8080/users/list'
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        try {
            let response = await axios(options)
            let record  = response.data;
            setPath(process.env.REACT_APP_IMAGE_PATH+record.profile)
            dispatch({type:'UPDATE_NAME',payload:record.name})
            setInfo({
                name:record.name,
                email:record.email,
                phone:record.phone
            }) 

        } catch (e) {
            history.push('/login')
            //toast.error("Something Went Wrong!");

        }
    }, [])

    return (
        <div className="container">
            <div className="row login homepage">
                <ToastContainer />
                <h3 className="heading">Welcome Code  </h3><br />
                <div className="row">
                    <div className="col-md-5">
                        <img src={imagePath} alt="profile" width="240" height="200" />
                    </div>
                    <div className="col-md-7">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th width="50%">Name</th>
                                    <td width="50%">{info.name}</td>
                                </tr>
                                <tr>
                                    <th width="50%">Email</th>
                                    <td width="50%">{info.email}</td>
                                </tr>
                                <tr>
                                    <th width="50%">Phone</th>
                                    <td width="50%">{info.phone}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home

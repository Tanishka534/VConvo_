import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link, useNavigate } from 'react-router-dom' ;
import axios from "axios";
import logo from '../assets/logo.png'
import { signupRoute } from '../utilities/APIRoutes';
import SocialHandle from '../components/SocialHandle';
const SignUp = () => {
    const navigate = useNavigate()
    const[values,setValues]=useState({
        username:"",
        emailId:"",
        password:"",
        confirmPassword:"",
    });

    useEffect(()=>{
        if(localStorage.getItem('VConvo-user')){
            navigate('/')
        }
    },[navigate])
    
    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(handleValidation()){
            // console.log(signupRoute);
            const {password,username,emailId}=values;
            try {
                const { data } = await axios.post(signupRoute, {
                  username,
                  emailId,
                  password,
                });
                console.log('Axios Response:', data);
                // Handle successful response
                if(data.status===false)
            {
                toast.error(data.msg,{
                    position:"top-right",
                    autoClose:3000,
                    pauseOnHover:true,
                    draggable:true,
                    theme:"dark",
                })
            }
            if(data.status===true)
            {
                localStorage.setItem('VConvo-user',JSON.stringify(data.user));
                navigate("/");
            }
            } catch (error) {
                console.error('Axios Error:', error);
                // Handle error, display a message, etc.
            }
            
            
        };
    }

    const handleValidation=()=>{
        const {password,confirmPassword,username,emailId}=values;
        if(password!==confirmPassword){
            toast.error("Passwords are not matching",{
                position:"top-right",
                autoClose:3000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark",
            });
            return false;
        }
        else if(username.length<6){
            toast.error("Username should contain atleast 6 characters",{
                position:"top-right",
                autoClose:3000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark",
            });
            return false;
        }
        else if(password.length<8){
            toast.error("Password should contain atleast 8 characters",{
                position:"top-right",
                autoClose:3000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark",
            });
            return false;
        }
        else if(emailId===""){
            toast.error("EmailId is required",{
                position:"top-right",
                autoClose:3000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark",
            });
            return false;
        }
        return true;
    }
    
    

    const handleChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value});
    }
  return (
    <>

    <FormContainer>
        <form action="" onSubmit={(event)=>handleSubmit(event)}>
            <div className="signup_main">
                <img src={logo} alt="logo" />
                {/* <h1>VConvo</h1> */}
            </div>
            <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e)=>handleChange(e)}
            />
            <input
                type="email"
                placeholder="Email-Id"
                name="emailId"
                onChange={(e)=>handleChange(e)}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e)=>handleChange(e)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e)=>handleChange(e)}
            />
            <button className='signup_btn' type="submit">Create User</button>
            {/* <SocialHandle/> */}
            <span>Already have an account? <Link to="/signin">SignIn</Link></span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap: 1rem;
    align-items: center;
    background-color: #101021;
    .signup_main{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img{
            height:5rem;
            margin-right:0rem;
        }
        h1{
            color:white;
            margin-left:0;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap: 2rem;
        background-color:#131312;
        border-radius : 2rem;
        padding: 3rem 5rem;
        input{
            background-color:transparent;
            padding : 0.8rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size : 1rem;
            &:focus{
                border : 0.1rem solid #997af0;
                outline: none;
            }
        }
        .signup_btn{
            background-color:#997af0;
            color:white;
            padding: 1rem 2rem;
            border: none;
            font-weight:bold;
            cursor: pointer;
            border-radius: 4rem;
            font-size: 1rem;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;

            }
        }
        span{
            color:white;
            a{
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }
`;

export default SignUp

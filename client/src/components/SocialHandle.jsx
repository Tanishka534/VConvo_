import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import {BsGoogle,BsGithub,BsFacebook} from "react-icons/bs"
import styled from 'styled-components'
import { firebaseAuth } from '../utilities/FirebaseConfig'
import axios from 'axios'
import { firebaseSigninRoute } from '../utilities/APIRoutes'
import { useNavigate } from 'react-router-dom'
const SocialHandle = () => {
    const navigate = useNavigate();
    const providers={
        google: new GoogleAuthProvider(),
        github : new GithubAuthProvider(),
    }
    const firebaseSignin = async(signinType)=>{
        try{
            const provider = providers[signinType];
            const userData = await signInWithPopup(firebaseAuth,provider);
            // const emailId = userData.user.emailId ? userData.user.emailId : providerData[0].emailId;
            const emailId = userData.user.emailId ? userData.user.emailId : userData.additionalUserInfo.email;
            const {data} = await axios.post(firebaseSigninRoute,{emailId});
            if(data.status)
            {
                localStorage.setItem(
                    'VConvo-user',JSON.stringify(data.user)
                );
                navigate("/");
            }
            else
            {
                navigate('/setusername');
            }
            console.log(userData);

        }
        catch(err)
        {
            console.log(err);
        }
    }
  return (
    <>
        <Container>
            <button type="button" onClick={()=>firebaseSignin("google")}>
                <BsGoogle/>
            </button>
            <button type="button" onClick={()=>firebaseSignin("github")}>
                <BsGithub/>
            </button>
            {/* <button type="button" onClick={()=>firebaseSignin("facebook")}>
                <BsFacebook/>
            </button> */}
        </Container>
    </>
  )
}

const Container = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    gap:1rem;
    background-color:transparent;
    button{
        background-color:transparent;
        color:white;
        padding:  0.8rem 1rem;
        border: 0.1rem solid #4e0eff;
        font-weight:bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        transition: 0.5s ease-in-out;
        display:flex;
        justify-content:center;
        align-items:center;
        &:hover{
            background-color:#4e0eff;

        }
    }
`

export default SocialHandle

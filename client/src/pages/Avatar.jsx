import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {useNavigate } from 'react-router-dom' ;
import axios from "axios";
import { avatarRoute } from '../utilities/APIRoutes';
import { Buffer } from 'buffer';
import loader from '../assets/Rocket.gif'

const Avatar = () => {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const[avatars,setAvatars] = useState([]);
    const[isLoading,setAvatarIsLoading] = useState(true);
    const[selectedAvatar,setSelectedAvatar] = useState(undefined);
    const toastMsg={
        position:"bottom-right",
        autoClose:2000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         if (!localStorage.getItem('VConvo-user')) {
    //           navigate('/signin');
    //         } else {
    //           const data = [];
    //           for (let i = 0; i < 5; i++) {
    //             const response = await axios.get(
    //               `${api},${Math.round(Math.random() * 1000)}`
    //             );
    //             const buffer = new Buffer(response.data);
    //             data.push(buffer.toString('base64'));
    //           }
    //           setAvatars(data);
    //           setAvatarIsLoading(false);
    //         }
    //       } catch (error) {
    //         if (axios.isAxiosError(error) && error.response) {
    //           // The request was made and the server responded with a status code
    //           console.error('Request failed with status code:', error.response.status);
    //         } else if (axios.isAxiosError(error)) {
    //           // Something went wrong in setting up the request
    //           console.error('Error setting up the request:', error.message);
    //         } else {
    //           // Something happened in setting up the request that triggered an Error
    //           console.error('Unexpected error:', error.message);
    //         }
    //         // You may want to handle the error state or display a message to the user
    //       }
    //     };
    
    //     fetchData();
    //   }, [navigate]);

    useEffect(() => {
      const fetchData = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString('base64'));
        }
        setAvatars(data);
        setAvatarIsLoading(false);
      };
  
      fetchData();
    }, []); // Empty dependency array to run only once on mount
  
    const setAvatarProfile = async () => {
      if (selectedAvatar === undefined) {
        toast.error('Please select an avatar', toastMsg);
      } else {
        const user = await JSON.parse(localStorage.getItem('VConvo-user'));
  
        try {
          const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar],
          });
  
          if (data.isSet) {
            user.isAvatar = true;
            user.avatarImage = data.image;
            localStorage.setItem('VConvo-user', JSON.stringify(user));
            navigate('/');
          } else {
            toast.error('Error! Please try again.', toastMsg);
          }
        } catch (error) {
          console.error('Error setting avatar profile:', error);
          // Handle errors, e.g., redirect to error page or display a message
        }
      }
    };
    // useEffect(async()=>{
    //     const data = [];
    //     for(let i=0;i<5;i++)
    //     {
    //        const image = await axios.get(`${api},${Math.round(Math.random()*1000)}`);
    //        const buffer = new Buffer(image.data);
    //        data.push(buffer.toString("base64"))
    //     }
    //     setAvatars(data);
    //     setAvatarIsLoading(false);
    // },[])
  return (
    <>
    {isLoading ? (
        <Container>
        <img src={loader} alt="loader" className="loader" />
      </Container>
    ) : (
    <Container>
        <div className="avatar_title">
            <h1>Select an Avatar for your Profle </h1>
        </div>
        <div className="avatars">
            {
                avatars.map((avatar,index)=>{
                  return (
                    <div key={index}
                      className={`avatar ${
                        selectedAvatar === index ? "selected" : ""
                      }`}
                    >
                      <img
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="avatar"
                        key={avatar}
                        onClick={() => setSelectedAvatar(index)}
                      />
                    </div>
                  );
                })
            }
        </div>
        <button onClick={setAvatarProfile} className="submit_btn">
            Set as Profile Picture
          </button>
          <ToastContainer/>
    </Container>
    )}
    </>
  )
}

const Container = styled.div`
height:100vh;
width:100vw;
display: flex;
justify-content :center;
align-items:center;
flex-direction:column;
gap: 2.4rem;
background-color: #101021;
.loader{
    max-inline-size : 100%;
}
.avatar_title{
    h1{
        color:white;
    }
}
.avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit_btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
export default Avatar

import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Rocket from '../assets/Rocket.gif'
import screen from '../assets/vid.gif'
import start from '../assets/start.gif'
const StartScreen = () => {
//     const [userName, setUserName] = useState("");
//   useEffect(async () => {
//     setUserName(
//       await JSON.parse(
//         localStorage.getItem('VConvo-user')
//       ).username
//     );
//   }, []);
const [userName, setUserName] = useState("");

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await JSON.parse(localStorage.getItem('VConvo-user'));
      setUserName(data.username);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error, e.g., redirect or display an error message
    }
  };

  fetchData();
}, []);
  return (
    <>
    <Container>
        <img src={screen} alt="" />
        <h1>
            Welcome, <span>{userName}!</span>
        </h1>
        <h3>
            Select a chat to start conversation
        </h3>
    </Container>
    </>
  )
}

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
img{
    height:20rem;
}
span{
    color:#4e00ff;
}
h1{
  margin-bottom:0.7rem;
}

`

export default StartScreen

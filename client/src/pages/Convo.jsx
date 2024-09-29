import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { allusersRoute,host } from '../utilities/APIRoutes';
import Contacts from '../components/Contacts';
import StartScreen from '../components/StartScreen';
import { io } from "socket.io-client";
import ChatContainer from "../components/ChatContainer";

const Convo = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (localStorage.getItem('VConvo-user')) {
//           navigate('/signin');
//         } else {
//           setCurrentUser(await JSON.parse(localStorage.getItem('VConvo-user')));
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         if (currentUser) {
//           if (currentUser.isAvatar) {
//             const response = await axios.get(`${allUserRoute}/${currentUser._id}`);
//             setContacts(response.data);
//           } else {
//             navigate('/avatar');
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching contacts:', error);
//       }
//     };

//     fetchContacts();
// //   }, [currentUser, navigate]);
// useEffect(async () => {
//     if (!localStorage.getItem('VConvo-user')) {
//       navigate("/signin");
//     } else {
//       setCurrentUser(
//         await JSON.parse(
//           localStorage.getItem('VConvo-user')
//         )
//       );
//     }
//   }, []);
//   useEffect(() => {
//     if (currentUser) {
//       socket.current = io(host);
//       socket.current.emit("add-user", currentUser._id);
//     }
//   }, [currentUser]);

//   useEffect(async () => {
//     if (currentUser) {
//       if (currentUser.isAvatar) {
//         const data = await axios.get(`${allusersRoute}/${currentUser._id}`);
//         setContacts(data.data);
//       } else {
//         navigate("/avatar");
//       }
//     }
//   }, [currentUser]);
//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   };
useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!localStorage.getItem('VConvo-user')) {
          navigate('/signin');
        } else {
          setCurrentUser(await JSON.parse(localStorage.getItem('VConvo-user')));
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error, e.g., redirect to login page or display an error message
      }
    };
  
    fetchUser();
  }, [navigate]);
  
  useEffect(() => {
    const initializeSocket = () => {
      if (currentUser) {
        socket.current = io(host);
        socket.current.emit('add-user', currentUser._id);
      }
    };
  
    initializeSocket();
  }, [currentUser]);
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatar) {
            const { data } = await axios.get(`${allusersRoute}/${currentUser._id}`);
            setContacts(data);
          } else {
            navigate('/avatar');
          }
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        // Handle error, e.g., redirect to avatar page or display an error message
      }
    };
  
    fetchContacts();
  }, [currentUser, navigate]);
  
  
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  return (
    <>
      {/* <Container>
        <div className="convo_container">
          <Contacts contacts={contacts} currentUser={currentUser} />
          <StartScreen currentUser={currentUser} />
        </div>
      </Container> */}
      <Container>
        <div className="convo_container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <StartScreen />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #101021;
  .convo_container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    // padding-top:2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Convo;



//Managing startscreen
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { allusersRoute, host } from '../utilities/APIRoutes';
// import Contacts from '../components/Contacts';
// import StartScreen from '../components/StartScreen';
// import { io } from 'socket.io-client';
// import ChatContainer from '../components/ChatContainer';

// const Convo = () => {
//   const navigate = useNavigate();
//   const socket = useRef();
//   const [contacts, setContacts] = useState([]);
//   const [currentChat, setCurrentChat] = useState(undefined);
//   const [currentUser, setCurrentUser] = useState(undefined);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (!localStorage.getItem('VConvo-user')) {
//           navigate('/signin');
//         } else {
//           setCurrentUser(await JSON.parse(localStorage.getItem('VConvo-user')));
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         // Handle error, e.g., redirect to login page or display an error message
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   useEffect(() => {
//     const initializeSocket = () => {
//       if (currentUser) {
//         socket.current = io(host);

//         socket.current.on('contacts', (data) => {
//           setContacts(data);
//         });

//         socket.current.emit('add-user', currentUser._id);
//       }
//     };

//     initializeSocket();
//   }, [currentUser]);

//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   };

//   return (
//     <Container>
//       <div className="convo_container">
//         <Contacts contacts={contacts} changeChat={handleChatChange} />
//         {currentChat === undefined ? (
//           <StartScreen />
//         ) : (
//           <ChatContainer currentChat={currentChat} socket={socket} />
//         )}
//       </div>
//     </Container>
//   );
// };

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 1rem;
//   background-color: #101021;
//   .convo_container {
//     height: 85vh;
//     width: 85vw;
//     background-color: #00000076;
//     display: grid;
//     grid-template-columns: 25% 75%;

//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// `;

// export default Convo;


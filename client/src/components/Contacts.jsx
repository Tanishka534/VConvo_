import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
const Contacts = ({contacts,changeChat}) => {
  console.log("Contacts props:", contacts);
    // const [currentUserName,setCurrentUserName]=useState(undefined);
    // const [currentUserImage,setCurrentUserImage]=useState(undefined);
    // const [currentSelectedUser,setCurrentSelectedUser]=useState(undefined);
    // useEffect(async () => {
    //   const data = await JSON.parse(
    //     localStorage.getItem('VConvo-user')
    //   );
    //   setCurrentUserName(data.username);
    //   setCurrentUserImage(data.avatarImage);
    // }, []);
    // const changeCurrentChat = (index, contact) => {
    //   setCurrentSelectedUser(index);
    //   changeChat(contact);
    // };
    
    const [currentUserName, setCurrentUserName] = useState(undefined);
const [currentUserImage, setCurrentUserImage] = useState(undefined);
const [currentSelectedUser, setCurrentSelectedUser] = useState(undefined);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await JSON.parse(localStorage.getItem('VConvo-user'));
      console.log("Fetched user data:", data);
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error, e.g., redirect or display an error message
    }
  };

  fetchData();
}, []); // Empty dependency array to run the effect only once when the component mounts

const changeCurrentChat = (index, contact) => {
  setCurrentSelectedUser(index);
  changeChat(contact);
};

    return (
        <>
          {currentUserImage && currentUserImage && contacts!==undefined &&(
            <Container>
              <div className="container">
                {/* <img src={logo} alt="logo" /> */}
                <h1>VConvo</h1>
              </div>
              <div className="contacts">
                {contacts.map((contact, index) => {
                  return (
                    <div
                      key={contact._id}
                      // key={index}
                      className={`contact ${
                        index === currentSelectedUser ? "selected" : ""
                      }`}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt="avatarImage"
                        />
                      </div>
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="current-user">
              {currentUserImage && (
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentUserImage}`}
            alt="avatar"
          />
        </div>
      )}
                <div className="username">
                  <h2>{currentUserName}</h2>
                </div>
              </div>
            </Container>
          )}
        </>
      );
    }
    const Container = styled.div`
      display: grid;
      grid-template-rows: 10% 70% 20%;
      overflow: hidden;
      background-color: #080420;
      .container {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        // margin:1rem;
        margin-top:1rem;
        img {
          height: 2.2rem;
          // border-radius:100%;
        }
        h1 {
          color: white;
        }
      }
      .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top:1rem;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
          width: 0.2rem;
          &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
          }
        }
        .contact {
          background-color: #ffffff34;
          min-height: 4.5rem;
          cursor: pointer;
          width: 90%;
          border-radius: 0.2rem;
          padding: 0.3rem;
          display: flex;
          gap: 1rem;
          align-items: center;
          transition: 0.5s ease-in-out;
          .avatar {
            img {
              height: 3rem;
            }
          }
          .username {
            h3 {
              color: white;
            }
          }
        }
        .selected {
          background-color: #9a86f3;
        }
      }

      .current-user{
        // display:flex;
        // justify-content: center;
        // align-items: center;
        padding: 1.6rem;
        padding-left:7.2rem;
        box-sizing: border-box;
        .avatar {
          img {
            height: 3.5rem;
            max-inline-size: 100%;
          }
        }
        .username {
            
          h2 {
            // text-align:center;
            font-size: 1.2rem;
            color: white;
          }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          gap: 0.5rem;
          .username {
            h2 {
              font-size: 1.1rem;
            }
          }
        }
        
      }
    
      .current_user {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        height:20%
        padding: 1rem; // Add padding to ensure content is not at the edges
    box-sizing: border-box; // Ensure padding is included in width/height calculations

        .avatar {
          img {
            height: 4rem;
            max-inline-size: 100%;
          }
        }
        .username {
          h2 {
            color: white;
          }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          gap: 0.5rem;
          .username {
            h2 {
              font-size: 1rem;
            }
          }
        }
      }
    `;
export default Contacts

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { useAuth0 } from '@auth0/auth0-react';

const Header = styled.div`
  margin-bottom: 30px;
  margin-top: 30px;
  font-weight: bold;
  font-size: 24px;
`
const Page = styled.div`
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 500px;
  align-items: center;
  flex-direction: column;
  background: #FFFFFF;
  overflow: auto;
  margin-top: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 396px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 2px;
`;

const TextArea = styled.textarea`
  width: 96%;
  height: 50px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  border: 1px solid lightgray;
  outline: none;
  color: black;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: black;
  }
`;

const Button = styled.button`
  background-color: grey;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: white;
  font-size: 17px;
`;

const Form = styled.form`
  width: 400px;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  background-color: lightgray;
  color: #46516e;
  padding: 10px;
  margin-right: 5px;
  margin-left: 5px;
  text-align: left;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  color: gray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: left;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;

let socket;

const Chat = () => {
  const [userId, setUserId] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [sent, setSent] = useState(false);
  // const CHATSERVER = "http://localhost:8081";
  const CHATSERVER = "https://backend-dot-second-folio-294223.nn.r.appspot.com";
  const { user, isLoading, isAuthenticated } = useAuth0();

  let userName;

  if (!isLoading && isAuthenticated) {
    userName = user.nickname;
  }

  useEffect(() => {
    // const { name, room } = queryString.parse(window.location.search);
    socket = io(CHATSERVER);

    // setRoom(room);
    // setName(name);

    // console.log("NAME", name);
    // console.log("ROOM", room);

    // socket.emit('join', { name, room }, (error) => {
    //   if(error) {
    //     alert(error);
    //   }
    // });

    socket.on("id", (id) => {
      console.log("SOCKET ID", id)
      setUserId(id);
    })

  }, [CHATSERVER, window.location.search]);

  useEffect(() => {
    socket.on("message", message => {
      console.log("Message emitted from server", message);
      setMessages(oldMsgs => [...oldMsgs, message]);
    });
    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
  }, []);

  console.log("MESSAGES", messages);

  const sendMessage = (e) => {
    e.preventDefault();

    const messageObject = {
      body: message,
      id: userId,
    };

    if (message) {
      socket.emit('sendMessage', messageObject);
      setMessage("");
    }
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }

  return (
    <div>
      <Header>Welcome to the Community Chat!</Header>
      <Page>
        <Container>
          {messages.map((message, index) => {
            if (message.text.id === userId) {
              return (
                <MyRow key={index}>
                  <MyMessage>
                    {userName}: {message.text.body}
                  </MyMessage>
                </MyRow>
              )
            } else {
              return (
                <PartnerRow key={index}>
                  <PartnerMessage>
                    {userName}: {message.text.body}
                  </PartnerMessage>
                </PartnerRow>
              )
            }
          })}
        </Container>
        <Form>
          <TextArea 
            value={message} 
            onChange={e => handleMessageChange(e)} 
            placeholder="Start typing..." 
            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
          />
          <Button onClick={e => sendMessage(e)}>Send</Button>
        </Form>
      </Page>
    </div>
  );
};

export default Chat;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import './Chatroom.css';

let socket;

function Chatroom() {
    const { bookClubId, chatroomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const user = useSelector(state => state.session.user);
    const chatroom = useSelector(state => state.bookClubChatroom.byId[chatroomId]);

    useEffect(() => {
        // create connection
        socket = io();

        // socket.on('join', () => {
        //     socket.join(chatroomId).emit('hello', room = chatroomId);
        // })

        // listen for chat events
        socket.on('chat', chat => {
            // add any new messages into the messages array in the state
            setMessages(messages => [...messages, chat])
        });

        // disconnect on unmount
        return (() => {
            socket.disconnect();
        })
    }, []);

    function updateChatInput(e) {
        setChatInput(e.target.value);
    }

    function sendChat(e) {
        e.preventDefault();
        console.log(chatInput)
        console.log(messages)

        // emit a message
        socket.emit('chat', {
            user: user.username,
            msg: chatInput
        });

        // clear input after sending
        setChatInput('')
    }

    if (!chatroom) {
        return (
            <>
                This chatroom does not exist.
            </>
        )
    }

    return (
        <>
            <div id="center__container">
                <div id='center__container--title'>{chatroom.name} Chat</div>
                Book Club: {bookClubId}.
                <div>
                    <div>
                        {messages.map((message, ind) => (
                            <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                        ))}
                    </div>
                    <form onSubmit={sendChat}>
                        <input
                            value={chatInput}
                            onChange={updateChatInput}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Chatroom;

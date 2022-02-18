import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'

let socket;

function Chat() {
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        // create connection
        socket = io();

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

    return (user && (
        <>
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
        </>
    )
    )
}

export default Chat;

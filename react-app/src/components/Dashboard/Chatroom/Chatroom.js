import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import './Chatroom.css';
import { getChatroomMessages } from '../../../store/chat_message';

let socket;

function Chatroom() {
    const { bookClubId, chatroomId } = useParams();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const chatroom = useSelector(state => state.bookClubChatroom.byId[chatroomId]);
    const prevMessagesObj = useSelector(state => state.chatroomMessage.byChatroomId[chatroomId]);
    const allUsersObj = useSelector(state => state.user.byId);

    useEffect(() => {
        // get previous chat messages
        dispatch(getChatroomMessages(chatroomId));

        // create connection
        socket = io();

        // join chatroom
        socket.emit('join', { username: sessionUser.username, chatroom_id: chatroomId });

        // listen for chat events
        socket.on('chat', chat => {
            console.log(messages)
            // add any new messages into the messages array in the state
            setMessages(messages => [...messages, chat])
        });

        // disconnect on unmount
        return (() => {
            socket.disconnect();
            setMessages([]);
        })
    }, [chatroomId]);

    function updateChatInput(e) {
        setChatInput(e.target.value);
    }

    function sendChat(e) {
        e.preventDefault();
        console.log(chatInput)
        console.log(messages)

        // emit a message
        socket.emit('chat', {
            user_id: sessionUser.id,
            username: sessionUser.username,
            body: chatInput,
            chatroom_id: chatroomId
        });

        // clear input after sending
        setChatInput('')
    }

    if (!chatroom) {
        return (
            <section id="center__container">
                <div id='center__container--title'>Reading List</div>
                <div className='readinglist__card--container'>
                    This chatroom does not exist.
                </div>
            </section>
        )
    }

    // console.log('HERES THE PREV MESSAGES', prevMessages)
    let prevMessages;
    if (prevMessagesObj) {
        prevMessages = Object.values(prevMessagesObj);
    }

    return (
        <>
            <section id="center__container">
                <div id='center__container--title'>{chatroom.name} Chat</div>
                Book Club: {bookClubId}.
                <div>
                    <div>
                        {prevMessages && allUsersObj && prevMessages.map((message, ind) => {
                            const userId = message.user_id;
                            const user = allUsersObj[userId]?.username;
                            return (
                                <div key={ind}>{`${user}: ${message.body}`}</div>
                            )
                        })}
                    </div>
                    <div>
                        {messages.map((message, ind) => (
                            <div key={ind}>{`${message.username}: ${message.body}`}</div>
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
            </section>
        </>
    )
}

export default Chatroom;

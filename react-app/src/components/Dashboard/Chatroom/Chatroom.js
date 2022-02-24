import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { getChatroomMessages } from '../../../store/chat_message';

import './Chatroom.css';
import ChatMessage from '../ChatMessage/ChatMessage';

let socket;

function Chatroom() {
    const { bookClubId, chatroomId } = useParams();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const chatroom = useSelector(state => state.bookClubChatroom.byId[chatroomId]);
    const prevMessagesObj = useSelector(state => state.chatroomMessage.byChatroomId[chatroomId]);
    // const allUsersObj = useSelector(state => state.user.byId);
    const bookClub = useSelector(state => state.bookClub.byId[bookClubId]);
    const chatRef = useRef();


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

    // scrollToBottom = () => {
    //     chatRef.current.scrollTop = chatRef.scrollHeight;
    // };


    if (!chatroom || !bookClub) {
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
            <section id='center__container'>
                <div id='center__container--topbar'>
                    <div className="circular__icon dashboard__icon">
                        {bookClub.image_url ? (<img src={bookClub.image_url} alt='' className='circular__icon--img dashboard__icon--img' />) : bookClub.name.slice(0, 1)}
                    </div>
                    <div id='center__container--title'>
                        {chatroom.name} Chat
                    </div>
                </div>
                <div id='center__container--main-content'>
                    <div id='chatroom__messages'>
                        <div ref={chatRef}>
                            {prevMessages && prevMessages.map((message, ind) => (
                                <ChatMessage message={message} />
                            ))}
                            {messages.map((message, ind) => (
                                <ChatMessage message={message} />
                            ))}
                        </div>
                    </div>
                </div>
                <div id='chatroom__input'>
                    <form onSubmit={sendChat}>
                        <input
                            value={chatInput}
                            onChange={updateChatInput}
                            placeholder='Type your message... '
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </section >
        </>
    )
}

export default Chatroom;

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { getChatroomMessages } from '../../../store/chat_message';

import ChatMessage from '../ChatMessage/ChatMessage';
import IconImage from '../IconImage/IconImage';

import './Chatroom.css';

let socket;

function Chatroom() {
    const { bookClubId, chatroomId } = useParams();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const chatroom = useSelector(state => state.bookClubChatroom.byId[chatroomId]);
    const prevMessagesObj = useSelector(state => state.chatroomMessage.byChatroomId[chatroomId]);
    const bookClub = useSelector(state => state.bookClub.byId[bookClubId]);

    useEffect(() => {
        // get previous chat messages
        dispatch(getChatroomMessages(chatroomId));

        // create connection
        socket = io();

        // join chatroom
        socket.emit('join', { username: sessionUser.username, chatroom_id: chatroomId });

        // listen for chat events
        socket.on('chat', chat => {
            // add any new messages into the messages array in the state
            setMessages(messages => [...messages, chat])
            scrollToBottom();
        });

        // disconnect on unmount
        return (() => {
            socket.disconnect();
            setMessages([]);
        })

    }, [dispatch, chatroomId, sessionUser]);

    function updateChatInput(e) {
        setChatInput(e.target.value);
    }

    function sendChat(e) {
        e.preventDefault();

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

    function scrollToBottom() {
        console.log('SCROOOOLL')
        const element = document.getElementById("center__container--main-content");

        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }

    if (!chatroom || !bookClub) {
        return (
            <section id="center__container">
                <div id='center__container--title'>Chatroom Not Found</div>
                <div className='readinglist__card--container'>
                    This chatroom does not exist.
                </div>
            </section>
        )
    }

    let prevMessages;
    if (prevMessagesObj) {
        prevMessages = Object.values(prevMessagesObj);

        // if (prevMessages.length) {
        //     console.log(prevMessages.length)
        //     scrollToBottom();
        // }
    }


    return (
        <>
            <section id='center__container'>
                <div id='center__container--topbar'>
                    <IconImage bookClub={bookClub} />
                    <div id='center__container--title'>
                        {bookClub.name}
                    </div>
                    <div id='center__container--subtitle'>
                        {chatroom.name} Chat
                    </div>
                </div>
                <div id='center__container--main-content'>
                    <div id='chatroom__messages'>
                        {prevMessages && prevMessages.map((message, ind) => (
                            <ChatMessage message={message} />
                        ))}
                        {messages.map((message, ind) => (
                            <ChatMessage message={message} />
                        ))}
                    </div>
                    {/* <div className='chatroom__footer' ref={chatRef}></div> */}
                </div>
                <div id='chatroom__input'>
                    <form onSubmit={sendChat}>
                        <input
                            value={chatInput}
                            onChange={updateChatInput}
                            placeholder='Type your message... '
                        />
                        <button className='send__chat' type="submit">Send</button>
                    </form>
                </div>
            </section >
        </>
    )
}

export default Chatroom;

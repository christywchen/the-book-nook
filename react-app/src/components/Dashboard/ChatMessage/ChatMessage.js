import { useSelector } from 'react-redux';

import './ChatMessage.css';

function ChatMessage({ message }) {
    const allUsersObj = useSelector(state => state.user.byId);

    const userId = message.user_id;
    const user = allUsersObj[userId];


    if (!user || !message) {
        return null;
    }

    return (
        <>
            <div className='message__container'>
                <div className='circular__icon chat__icon--user'>
                    {user.image_url ? (<img src={user.image_url} alt='' className='circular__icon--img chat__icon--user--img' />) : user.username.slice(0, 1)}
                </div>
                <div className='message__text'>
                    <div className='message__author'>{user.username}</div>
                    <div className='message__content'>{message.body}</div>
                </div>
            </div>
        </>
    )
}

export default ChatMessage;

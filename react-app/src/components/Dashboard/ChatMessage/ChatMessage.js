import { useSelector } from 'react-redux';

import IconImage from '../IconImage/IconImage';

import './ChatMessage.css';

function ChatMessage({ message }) {
    const allUsersObj = useSelector(state => state.user.byId);

    const userId = message.user_id;
    const user = allUsersObj[userId];

    const localTime = new Date(message.created_at).toLocaleTimeString()

    if (!user || !message) {
        return null;
    }

    return (
        <>
            <div className='message__container'>
                <IconImage user={user} />
                <div className='message__text'>
                    <div className='message__author'>{user.username}
                        <span className='message__at'> at </span>
                        <span className='message__time'>{localTime.slice(0, 5) + ' ' + localTime.slice(8)}</span>
                    </div>
                    <div className='message__content'>{message.body}</div>
                </div>
            </div>
        </>
    )
}

export default ChatMessage;

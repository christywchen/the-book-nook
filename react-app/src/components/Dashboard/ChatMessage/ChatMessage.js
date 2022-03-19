import { useSelector } from 'react-redux';
import { convertDate } from '../../../utils';

import IconImage from '../IconImage/IconImage';

import './ChatMessage.css';

function ChatMessage({ message }) {
    const allUsersObj = useSelector(state => state.user.byId);

    const userId = message.user_id;
    const user = allUsersObj[userId];

    if (!user || !message) {
        return null;
    }

    const [localTime, localDate, olderThanYesterday] = convertDate(message.created_at);

    return (
        <>
            <div className='message__container'>
                <IconImage user={user} />
                <div className='message__text'>
                    <div className='message__meta'>
                        <span className='message__author'>{user.username}</span>
                        <span className='message__time'> {localDate}</span>
                        {!olderThanYesterday && (
                            <>
                                <span className='message__at'> at </span>
                                <span className='message__time'>{localTime}</span>
                            </>)}
                    </div>
                    <div className='message__content'>{message.body}</div>
                </div>
            </div>
        </>
    )
}

export default ChatMessage;

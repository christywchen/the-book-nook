import { useSelector } from 'react-redux';

import IconImage from '../IconImage/IconImage';

import './ChatMessage.css';

function ChatMessage({ message }) {
    const allUsersObj = useSelector(state => state.user.byId);

    const userId = message.user_id;
    const user = allUsersObj[userId];

    let localTime;
    if (message.created_at) {
        const localTimeArr = new Date(message.created_at).toLocaleTimeString().split(' ')
        const localHoursArr = localTimeArr[0].split(':')
        const localHoursStr = localHoursArr[0] + ':' + localHoursArr[1]
        const localAMPM = localTimeArr[1]
        localTime = localHoursStr + ' ' + localAMPM
    }

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
                        <span className='message__time'>{localTime}</span>
                    </div>
                    <div className='message__content'>{message.body}</div>
                </div>
            </div>
        </>
    )
}

export default ChatMessage;

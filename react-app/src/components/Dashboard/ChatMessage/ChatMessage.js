import { useSelector } from 'react-redux';

import IconImage from '../IconImage/IconImage';

import './ChatMessage.css';

function ChatMessage({ message }) {
    const allUsersObj = useSelector(state => state.user.byId);

    const userId = message.user_id;
    const user = allUsersObj[userId];

    let localTime, localDate, olderThanYesterday;
    if (message.created_at) {
        const localTimeArr = new Date(message.created_at).toLocaleTimeString().split(' ')
        const localHoursArr = localTimeArr[0].split(':')
        const localHoursStr = localHoursArr[0] + ':' + localHoursArr[1]
        const localAMPM = localTimeArr[1]
        localTime = localHoursStr + ' ' + localAMPM

        const postDate = new Date(message.created_at).toLocaleDateString();
        const todayDate = new Date().toLocaleDateString();

        const postDateArr = postDate.split('/');
        const postMonth = postDateArr[0];
        const postDay = postDateArr[1];
        const postYear = postDateArr[2];

        const todayDateArr = todayDate.split('/');
        const todayMonth = todayDateArr[0];
        const todayDay = todayDateArr[1];
        const todayYear = todayDateArr[2];

        if (postDate === todayDate) {
            localDate = 'Today';
        } else if (
            postMonth === todayMonth &&
            postYear === todayYear &&
            todayDay - postDay === 1) {
            localDate = 'Yesterday';
        } else {
            localDate = postDate;
            olderThanYesterday = true;
        }

    }


    if (!user || !message) {
        return null;
    }

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

import { useParams } from "react-router-dom";

import './Chatroom.css';

function Chatroom() {
    const { bookClubId, chatType } = useParams();

    return (
        <>
            <div id="center__container">
                <div id='center__container--title'>{chatType.slice(0, 1).toUpperCase() + chatType.slice(1)} Chat</div>
                Book Club: {bookClubId}.
            </div>
        </>
    )
}

export default Chatroom;

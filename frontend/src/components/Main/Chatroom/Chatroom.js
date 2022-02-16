import { useParams } from "react-router-dom";

import './Chatroom.css';

function Chatroom() {
    const { bookClubId, chatType } = useParams();

    return (
        <>
            <div id="chatroom__container">
                <h3>
                    My Chatroom
                </h3>
                Book Club Id: {bookClubId}. {chatType}.
            </div>
        </>
    )
}

export default Chatroom;

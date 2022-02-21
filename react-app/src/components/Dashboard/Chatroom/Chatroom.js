import { useParams } from "react-router-dom";

import './Chatroom.css';

function Chatroom() {
    const { id, chatType } = useParams();

    return (
        <>
            <div id="center__container">
                <h3>
                    My Chatroom
                </h3>
                Book Club Id: {id}. {chatType}.
            </div>
        </>
    )
}

export default Chatroom;

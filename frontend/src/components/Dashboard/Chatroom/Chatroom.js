import { useParams } from "react-router-dom";

function Chatroom() {
    const { bookClubId, chatType } = useParams();

    return (
        <>
            <div>
                <h3>
                    My Chatroom
                </h3>
                Book Club Id: {bookClubId}. {chatType}.
            </div>
        </>
    )
}

export default Chatroom;

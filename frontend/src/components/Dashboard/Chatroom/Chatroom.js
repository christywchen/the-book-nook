import { useParams } from "react-router-dom";

function Chatroom() {
    const { bookClubId, chatType } = useParams();

    return (
        <>
            <div>
                My Chatroom. Book Club Id: {bookClubId}. {chatType}.
            </div>
        </>
    )
}

export default Chatroom;

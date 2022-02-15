import { useParams } from "react-router-dom";

function Chatroom() {
    const { bookClubId } = useParams();

    return (
        <>
            <div>
                My Chatroom. Book Club Id: {bookClubId}
            </div>
        </>
    )
}

export default Chatroom;

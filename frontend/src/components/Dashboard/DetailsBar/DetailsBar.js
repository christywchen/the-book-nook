import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DetailsBar({ bookClubs }) {
    const { bookClubId } = useParams();
    const bookClubsObj = useSelector(state => state.bookClub.byId);

    const bookClub = bookClubsObj[bookClubId];

    console.log(bookClubId, bookClub)
    return (
        <>
            <div>
                <h3>
                    Book Club Details
                </h3>
                <li>
                    Name: {bookClub?.name}
                </li>
                <li>
                    Description: {bookClub?.description}
                </li>
                <li>
                    Host: {bookClub?.host_id}
                </li>
                <li>
                    Created At: {bookClub?.created_at}
                </li>
                <h3>
                    Book Club Members
                </h3>
            </div>
        </>
    )
}

export default DetailsBar;

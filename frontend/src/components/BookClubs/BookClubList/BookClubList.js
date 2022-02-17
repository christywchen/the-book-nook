import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookClubs } from "../../../store/book_club";

function BookClubList() {
    const dispatch = useDispatch();
    const bookClubsObj = useSelector(state => state.bookClub.byId);
    const bookClubs = Object.values(bookClubsObj);

    useEffect(() => {
        dispatch(getAllBookClubs());
    }, [dispatch]);


    return (
        <>
            <div id='wide__container'>
                <div id='wide__title'>Explore Book Clubs</div>
                {bookClubs.length > 0 && bookClubs.map(bookClub => {
                    return (<>{bookClub.name}</>)
                })}
            </div>
        </>
    )
}

export default BookClubList;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function BookClubForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [capacity, setCapacity] = useState('');

    return (
        <>
            Book Club Form
        </>
    )
}

export default BookClubForm;

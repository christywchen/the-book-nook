import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createBookClub, getAllBookClubs } from "../../../store/book_club";
import { getBookClubMembers, getUserMemberships } from "../../../store/book_club_member";

function BookClubForm({ formType }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [capacity, setCapacity] = useState('');
    const [errors, setErrors] = useState([])

    async function handleSubmit(e) {
        e.preventDefault();
        const hostId = sessionUser.id;

        if (formType === 'createNew') {
            const data = await dispatch(createBookClub(name, description, hostId, imageUrl, capacity));

            console.log(data, 'DATATATATAT')
            if (data.errors) {
                setErrors(data.errors);
            } else {
                const bookClub = data;
                console.log(bookClub)
                await dispatch(getUserMemberships(sessionUser.id));
                await dispatch(getAllBookClubs());
                return history.push(`/dashboard/book-clubs/${bookClub.id}/rooms/general`);
            }
        }

        if (formType === 'edit') {

        }
    }

    async function handleReset(e) {
        e.preventDefault();

        setName('');
        setDescription('');
        setImageUrl('');
        setCapacity('');
        setErrors([])
    }

    return (
        <>
            <div id='form__container'>

                <form onSubmit={handleSubmit} onReset={handleReset}>
                    {errors.length > 0 && (
                        <ul className='auth__container--errors'>{
                            errors.map((error, ind) => (
                                <li key={ind}>{error}</li>
                            ))
                        }
                        </ul>
                    )}
                    <div>
                        <label>
                            <input
                                name='name'
                                type='text'
                                placeholder='Name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            <textarea
                                name='description'
                                type='text'
                                placeholder='Description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            ></textarea>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                name='image_url'
                                type='text'
                                placeholder='Image Url'
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                name='capacity'
                                type='number'
                                placeholder='Member Capacity'
                                value={capacity}
                                onChange={e => setCapacity(e.target.value)}
                            ></input>
                        </label>
                    </div>
                    <div className='form__buttons'>
                        <button
                            disabled={!name || !capacity}
                            className='button' type='submit'>Submit</button>
                        <button
                            // disabled={!name || !capacity}
                            className='button' type='reset'>Reset</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default BookClubForm;

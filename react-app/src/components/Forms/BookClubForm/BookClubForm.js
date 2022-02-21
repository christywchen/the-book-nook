import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBookClub, getAllBookClubs, updateBookClub } from "../../../store/book_club";
import { getUserMemberships } from "../../../store/book_club_member";

function BookClubForm({ formType, formProps }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState(formProps?.name || '');
    const [description, setDescription] = useState(formProps?.description || '');
    const [imageUrl, setImageUrl] = useState(formProps?.image_url || '');
    const [capacity, setCapacity] = useState(formProps?.capacity || '');
    const [errors, setErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        const hostId = sessionUser.id;

        if (formType === 'createNew') {
            const data = await dispatch(createBookClub(name, description, hostId, imageUrl, capacity));

            if (data.errors) {
                setErrors(data.errors);
            } else {
                const bookClub = data;
                await dispatch(getUserMemberships(sessionUser.id));
                await dispatch(getAllBookClubs());
                return history.push(`/dashboard/book-clubs/${bookClub.id}/rooms/general`);
            }
        }

        if (formType === 'editRecord') {
            let id = formProps.id;
            let hostId = formProps.host_id

            const data = await dispatch(updateBookClub(id, name, description, hostId, imageUrl, capacity))

            if (data.errors) {
                setErrors(data.errors);
            } else {
                return history.goBack();
            }
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
                        <label>Name</label>
                        <input
                            name='name'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name='description'
                            type='text'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label>Image Url</label>
                        <input
                            name='image_url'
                            type='text'
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Member Capacity</label>
                        <input
                            name='capacity'
                            type='number'
                            value={capacity}
                            onChange={e => setCapacity(e.target.value)}
                        ></input>
                    </div>
                    <div className='form__buttons'>
                        <button
                            disabled={!name || !capacity}
                            className='button' type='submit'>Submit</button>
                        {formType === 'createNew' && (
                            <>
                                <hr />
                                <button
                                    disabled={!(name || capacity || description || imageUrl)}
                                    className='button' type='reset'>Reset</button>
                            </>
                        )}
                    </div>
                </form>
            </div >

        </>
    )
}

export default BookClubForm;

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
    // const [errors, setErrors] = useState([]);

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [capacityError, setCapacityError] = useState('');
    const [membershipError, setMembershipError] = useState('');
    const [errorNotif, setErrorNotif] = useState(false);

    function setErrors(data) {
        if (data.errors.name) setNameError(data.errors.name);
        else setNameError('');

        if (data.errors.description) setDescriptionError(data.errors.description);
        else setDescriptionError('');

        if (data.errors.capacity) setCapacityError(data.errors.capacity);
        else setCapacityError('');

        if (data.errors['memberships exceeded']) {
            setMembershipError(data.errors['memberships exceeded']);
            setNameError('');
            setDescriptionError('');
            setCapacityError('');
            setErrorNotif(false);
        } else {
            setMembershipError('');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const hostId = sessionUser.id;

        if (formType === 'createNew') {
            const data = await dispatch(createBookClub(name, description, hostId, imageUrl, capacity));

            if (data.errors) {
                setErrorNotif(true);
                setErrors(data);
            } else {
                const bookClub = data;
                await dispatch(getUserMemberships(sessionUser.id));
                await dispatch(getAllBookClubs());
                return history.push(`/dashboard/book-clubs/${bookClub.id}/reading-list`);
            }
        }

        if (formType === 'editRecord') {
            let id = formProps.id;
            let hostId = formProps.host_id;

            const data = await dispatch(updateBookClub(id, name, description, hostId, imageUrl, capacity))

            if (data.errors) {
                setErrorNotif(true);
                setErrors(data);
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

        setNameError('');
        setDescriptionError('');
        setCapacityError('');
        setMembershipError('');

        setErrorNotif(false);
    }

    return (
        <>
            <div id='form__container'>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div>
                        <div className='label__section'>
                            <label>Name*</label>
                            <span className='error__message'>
                                {nameError}
                            </span>
                        </div>
                        <input
                            name='name'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <div className='label__section'>
                            <label>Description</label>
                            <span className='error__message'>
                                {descriptionError}
                            </span>
                        </div>
                        <textarea
                            name='description'
                            type='text'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <div className='label__section'>
                            <label>Image URL</label>
                        </div>
                        <input
                            name='image_url'
                            type='text'
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <div className='label__section'>
                            <label>Member Capacity*</label>
                            <span className='error__message'>
                                {capacityError}
                            </span>
                        </div>
                        <input
                            name='capacity'
                            type='number'
                            value={capacity}
                            onChange={e => setCapacity(e.target.value)}
                        ></input>
                    </div>
                    {formType === 'createNew' && membershipError && (
                        <ul className='auth__container--errors'>
                            <li>{membershipError}</li>
                        </ul>
                    )}
                    {errorNotif && (
                        <ul className='auth__container--errors'>
                            <li>Something seems to be missing. Check above to see what went wrong.</li>
                        </ul>
                    )}
                    <div className='form__buttons'>
                        <button
                            // disabled={!name || !capacity}
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

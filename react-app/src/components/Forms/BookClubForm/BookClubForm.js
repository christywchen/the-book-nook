import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBookClub, getAllBookClubs, updateBookClub } from "../../../store/book_club";
import { getUserMemberships } from "../../../store/book_club_member";

import '../ImageUpload.css';
import loading from '../../../assets/loading.svg'

function BookClubForm({ formType, formProps }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState(formProps?.name || '');
    const [description, setDescription] = useState(formProps?.description || '');
    const [imageUrl, setImageUrl] = useState(formProps?.image_url || '');
    const [capacity, setCapacity] = useState(formProps?.capacity || '');

    const [imageLoading, setImageLoading] = useState(false);
    const [imageName, setImageName] = useState(formProps?.image_name || null);
    const [uploadPrompt, setUploadPrompt] = useState(formProps?.image_name || 'No file selected.');
    const [imageError, setImageError] = useState('');

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

        if (data.errors && data.errors['memberships exceeded']) {
            setMembershipError(data.errors['memberships exceeded']);
            setNameError('');
            setDescriptionError('');
            setImageError('');
            setCapacityError('');
            setErrorNotif(false);
        } else {
            setMembershipError('');
        }
    }

    async function handleFile(e) {
        const file = e.target.files[0];

        if (file) {
            setImageLoading(true);

            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch('/api/images', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                await setImageUrl(data.url);
                setImageName(file.name);
                setUploadPrompt(file.name);
                setImageError('');
            } else if (data.errors) {
                setImageError('Image type must be an accepted format.');
            }

            setImageLoading(false);
        }
    }

    async function handleRemoveFile(e) {
        setUploadPrompt('No file selected.');
        setImageName(null);
        setImageUrl('');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const hostId = sessionUser.id;

        if (imageError) {
            setErrorNotif(true);
            return;
        } else {
            setErrorNotif(false);
        }

        if (formType === 'createNew') {
            const data = await dispatch(createBookClub(name, description, hostId, imageUrl, imageName, capacity));

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

            const data = await dispatch(updateBookClub(id, name, description, hostId, imageUrl, imageName, capacity))

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
                            <label>Book Club Icon</label>
                            <span className='error__message'>
                                {imageError}
                            </span>
                        </div>
                        <div className='form__upload--text'>
                            Upload a PNG, JPG, or JPEG.
                        </div>
                        <div className='form__upload'>
                            {imageLoading && (
                                <div className='form__upload--loading'>
                                    <img className='loading__image' src={loading} />
                                </div>

                            )}
                            <div className={'form__upload--content' + (imageLoading ? ' loading__opacity' : '')} >
                                <label htmlFor='file' className='form__upload--inp'>
                                    <input id='file' accept="image/*" type="file" onChange={handleFile} />
                                    Choose a File
                                </label>
                                <div className='form__upload--prompt' >
                                    {uploadPrompt} {imageName && (<i className="fa-solid fa-s fa-xmark form__upload--icon" onClick={handleRemoveFile}></i>)}
                                </div>
                            </div>
                        </div>
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
                            disabled={!name || !capacity || imageError || imageLoading}
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

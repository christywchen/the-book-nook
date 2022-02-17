import BookClubForm from "../BookClubForm/BookClubForm";

function BookClubCreate() {
    const formType = 'createNew';

    return (
        <>
            <div id='wide__container'>
                <div id='wide__title'>Start a Book Club</div>
                <div id='form__content'>
                    <BookClubForm formType={formType} />
                </div>
            </div>
        </>
    )
}

export default BookClubCreate;

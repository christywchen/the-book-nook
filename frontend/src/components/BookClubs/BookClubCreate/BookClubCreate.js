import BookClubForm from "../BookClubForm/BookClubForm";

function BookClubCreate() {
    const formType = 'createNew';

    return (
        <>
            <div id='wide__container'>
                <div id='wide__title'>Start a Book Club</div>

                <BookClubForm formType={formType} />

            </div>
        </>
    )
}

export default BookClubCreate;

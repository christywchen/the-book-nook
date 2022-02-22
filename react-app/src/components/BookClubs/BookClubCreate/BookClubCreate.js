import BookClubForm from "../../Forms/BookClubForm/BookClubForm";

function BookClubCreate() {
    const formType = 'createNew';

    return (
        <>
            <section id='wide__container'>
                <div id='wide__title'>Start a Book Club</div>
                <BookClubForm formType={formType} />
            </section>
        </>
    )
}

export default BookClubCreate;

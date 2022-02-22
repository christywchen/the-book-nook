import BookForm from "../../Forms/BookForm/BookForm";

function BookCreate() {
    const formType = 'createNew';

    return (
        <>
            <section id='wide__container'>
                <div id='wide__title'>Add a Book</div>
                <BookForm formType={formType} />
            </section>
        </>
    )
}

export default BookCreate;

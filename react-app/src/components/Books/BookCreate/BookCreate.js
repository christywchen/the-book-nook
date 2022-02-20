import BookForm from "../../Forms/BookForm/BookForm";

function BookCreate() {
    const formType = 'createNew';

    return (
        <>
            <div id='wide__container'>
                <div id='wide__title'>Add a Book</div>
                <BookForm formType={formType} />
            </div>
        </>
    )
}

export default BookCreate;

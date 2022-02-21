function ReadingListCard({ book }) {
    const { id, title, author, image_url } = book;
    return (
        <>
            <div className='readinglist__card'>
                {title}
            </div>
        </>
    )
}

export default ReadingListCard;

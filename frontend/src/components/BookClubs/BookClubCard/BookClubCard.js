import './BookClubCard.css';

function BookClubCard({ bookClub }) {
    const { id, name, description, host_id, image_url, capacity } = bookClub;
    const backgroundImage = { backgroundImage: `url("${image_url}")` }

    return (
        <>
            <div className="bookclub__card">
                <div className='event__card--image event__card--image-default' style={image_url ? backgroundImage : null}>
                </div>
                <div className='event__card--body'>
                    <h3 className='event__card--title'>

                        {bookClub.name}

                    </h3>
                    <div className='event__card--date'>{bookClub.id}</div>
                    <div className='event__card--location'>
                        <i className="fas fa-map-marker-alt fa-sm event__card--pin" />

                    </div>
                </div>
            </div>
        </>
    )
}

export default BookClubCard;

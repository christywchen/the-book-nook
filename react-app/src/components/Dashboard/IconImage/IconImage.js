function IconImage({ user, bookClub }) {
    const image_url = bookClub?.image_url || '';
    const backgroundImage = { backgroundImage: `url("${image_url}")` }

    if (!bookClub && !user) {
        return null;
    }

    if (user) {
        return (
            <>
                <div className="circular__icon dashboard__icon chat__icon--user">
                    {user.username.slice(0, 1)}
                </div>
            </>
        )
    }

    if (bookClub) {
        return (
            <>
                <div
                    className="circular__icon dashboard__icon"
                    style={backgroundImage}>
                    {!image_url && bookClub?.name.slice(0, 1)}
                </div>
            </>
        )
    }
}

export default IconImage;

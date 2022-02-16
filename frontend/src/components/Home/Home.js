import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Home.css';

function Home() {
    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <>
            <div id='home__container'>
                <div id='home__container--title'>The Book Nook</div>
            </div>
        </>

    )
}

export default Home;

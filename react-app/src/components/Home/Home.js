import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Home.css';
import openbook from '../../assets/openbook.png';
import bookshelf from '../../assets/bookshelf.png';

function Home() {
    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <>
            <div id='home__container'>
                <div id='home__container--img' >
                    <img alt='' src={openbook} />
                </div>
                <div id='home__container--tagline'>Read more. Discuss better. Stress less.</div>
                <div id='home__container--title'>Your Personal Book Club Manager</div>
            </div>
        </>

    )
}

export default Home;

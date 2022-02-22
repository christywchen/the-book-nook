import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import './Home.css';
import openbook from '../../assets/openbook.svg';

function Home() {
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    async function handleRedirect() {
        history.push('/signup');
    }

    if (user) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <>
            <div id='home__container'>
                {/* <div id='home__container--img' > */}
                {/* </div> */}
                <img id='home__container--img' alt='' src={openbook} />
                <div id='home__container--tagline'>Read more. Discuss better. Stress less.</div>
                <div id='home__container--title'>Your Personal Book Club Manager</div>
                <form onSubmit={handleRedirect}>
                    <button className='button button__home--large' type='submit'>Get Started</button>
                </form>
            </div>
        </>

    )
}

export default Home;

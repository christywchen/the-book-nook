import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';

function SocialLinks() {
    return (
        <>
            <a href='https://github.com/christywchen/' target="_blank" rel="noreferrer noopener">
                <img className='social__icon' alt='Github' src={github} />
            </a>
            <a href='https://www.linkedin.com/in/christy-chen/' target="_blank" rel="noreferrer noopener">
                <img className='social__icon' alt='LinkedIn' src={linkedin} />
            </a>
        </>
    )
}

export default SocialLinks;

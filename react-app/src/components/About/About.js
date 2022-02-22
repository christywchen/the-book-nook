import './About.css';

function About() {
    return (
        <>
            <div id='about__container'>
                <div id='about__container--title'>About</div>
                <div id='about__container--description'>
                    <p>
                        The Book Nook is a tool designed to help book clubs get organized so that hosts and members can do what they really want to do: read books, then talk about them.
                    </p>
                    <p>
                        This project was created by Christy Chen. It utilizes a Flask and Python backend, a database powered by PostgreSQL, and a React/Redux JavaScript frontend.
                    </p>
                    <p>
                        For more information, visit the project's <a href='https://github.com/christywchen/the-book-nook' target="_blank" rel="noreferrer noopener">Github</a> page or contact me via <a href='https://www.linkedin.com/in/christy-chen/' target="_blank" rel="noreferrer noopener">LinkedIn</a>.
                    </p>
                </div>
                <div id='about__container--credits'>
                    homepage book illustration by <a href="https://macrovector.com/">macrovector</a>
                </div>
            </div>
        </>

    )
}

export default About;

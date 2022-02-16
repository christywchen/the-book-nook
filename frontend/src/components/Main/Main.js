import { Route, Switch } from 'react-router-dom';

import Chatroom from './Chatroom/Chatroom';
import DetailsBar from './DetailsBar/DetailsBar';


function Main() {
    return (
        <>
            <Chatroom />
            <DetailsBar />

        </>
    )
}

export default Main;

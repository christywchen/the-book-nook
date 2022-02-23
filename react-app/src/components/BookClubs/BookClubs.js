import { Route, Switch, Redirect } from 'react-router-dom';

import BookClubList from './BookClubList/BookClubList';
import BookClubCreate from './BookClubCreate/BookClubCreate';
import BookClubEdit from './BookClubEdit/BookClubEdit';

function BookClubs() {
    return (
        <>
            <Switch>
                <Route path='/book-clubs' exact={true} >
                    <Redirect to='/book-clubs/all' />
                </Route>
                <Route path='/book-clubs/all' exact={true} >
                    <BookClubList />
                </Route>
                <Route path='/book-clubs/new' exact={true} >
                    <BookClubCreate />
                </Route>
                <Route path={'/book-clubs/:id(\\d+)/edit'} exact={true} >
                    <BookClubEdit />
                </Route>
            </Switch>
        </>
    )
}

export default BookClubs;

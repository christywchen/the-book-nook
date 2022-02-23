import { Route, Switch, Redirect } from 'react-router-dom';

import BookList from './BookList/BookList';
import BookDetails from './BookDetails/BookDetails';
import BookCreate from './BookCreate/BookCreate';
import BookEdit from './BookEdit/BookEdit';

function Books() {
    return (
        <>
            <Switch>
                <Route path='/books' exact={true} >
                    <Redirect to='/books/all' />
                </Route>
                <Route path='/books/all' exact={true} >
                    <BookList />
                </Route>
                <Route path={'/books/:id(\\d+)'} exact={true} >
                    <BookDetails />
                </Route>
                <Route path='/books/new' exact={true} >
                    <BookCreate />
                </Route>
                <Route path={'/books/:id(\\d+)/edit'} exact={true} >
                    <BookEdit />
                </Route>
            </Switch>
        </>
    )
}

export default Books;

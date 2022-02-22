import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import bookReducer from './book';
import bookClubReducer from './book_club';
import bookClubBookReducer from './book_club_book';
import bookClubMemberReducer from './book_club_member';
import bookClubChatroomReducer from './chatroom';
import session from './session'
import userReducer from './user';

const rootReducer = combineReducers({
  session,
  user: userReducer,
  bookClub: bookClubReducer,
  bookClubMember: bookClubMemberReducer,
  book: bookReducer,
  bookClubBook: bookClubBookReducer,
  bookClubChatroom: bookClubChatroomReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

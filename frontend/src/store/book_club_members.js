// constants
const LOAD_USER_MEMBERSHIPS = 'bookClubMember/loadUserMemberships';

const LOAD_BOOK_CLUB_MEMBERS = 'bookClubMember/loadBookClubMembers';
const ADD_BOOK_CLUB_MEMBER = 'bookClubMember/addBookClubMember';
const REMOVE_BOOK_CLUB_MEMBER = 'bookClubMember/removeBookClbuMember';

// action creators
const loadUserMemberships = (bookClubMemberships) => {
    return {
        type: LOAD_USER_MEMBERSHIPS,
        bookClubMemberships
    }
}

// thunk middlewares
export const getUserMemberships = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/book-clubs`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadUserMemberships(data['book club memberships']));
    }
}

// initial state
const initialState = { byUserMembershipId: {}, allUserMembershipIds: [] };

// book club member reducer
const bookClubMemberReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_USER_MEMBERSHIPS:
            newState = { ...state };
            newState.byUserMembershipId = action.bookClubMemberships.reduce((userMemberships, userMembership) => {
                newState.allUserMembershipIds.push(userMembership.id);
                userMemberships[userMembership.id] = userMembership;
                return userMemberships;
            });
            return newState;
        default:
            return state;
    }
};

export default bookClubMemberReducer;

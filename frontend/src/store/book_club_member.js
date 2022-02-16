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

const loadBookClubMembers = (bookClubMembers) => {
    return {
        type: LOAD_BOOK_CLUB_MEMBERS,
        bookClubMembers
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

export const getBookClubMembers = (id) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${id}/users`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBookClubMembers(data['book club members']));
    }
}

// initial state
const initialState = {
    byUserMembershipId: {},
    allUserMembershipIds: [],
    byBookClubMemberId: {},
    allBookClubMemberIds: []
};

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
            }, {});
            return newState;
        case LOAD_BOOK_CLUB_MEMBERS:
            newState = { ...state };
            newState.byBookClubMemberId = action.bookClubMembers.reduce((bookClubMembers, bookClubMember) => {
                newState.allBookClubMemberIds.push(bookClubMember.id);
                bookClubMembers[bookClubMember.id] = bookClubMember;
                return bookClubMembers;
            }, {});
            return newState;
        default:
            return state;
    }
};

export default bookClubMemberReducer;

// constants
const LOAD_USER_MEMBERSHIPS = 'bookClubMember/loadUserMemberships';
const REMOVE_USER_MEMBERSHIP = 'bookClubMember/removeUserMembership'

const LOAD_BOOK_CLUB_MEMBERS = 'bookClubMember/loadBookClubMembers';
const ADD_BOOK_CLUB_MEMBER = 'bookClubMember/addBookClubMember';
const REMOVE_BOOK_CLUB_MEMBER = 'bookClubMember/removeBookClubMember';

// action creators
const loadUserMemberships = (bookClubMemberships) => {
    return {
        type: LOAD_USER_MEMBERSHIPS,
        bookClubMemberships
    }
}

export const removeUserMembership = (bookClubId) => {
    return {
        type: REMOVE_USER_MEMBERSHIP,
        bookClubId
    }
}

const loadBookClubMembers = (bookClubMembers) => {
    return {
        type: LOAD_BOOK_CLUB_MEMBERS,
        bookClubMembers
    }
}

export const removeBookClubMember = (membershipId) => {
    return {
        type: REMOVE_BOOK_CLUB_MEMBER,
        membershipId
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

export const deleteBookClubMember = (id) => async (dispatch) => {

}

// initial state
const initialState = {
    userMembershipsByClubId: {},
    allUserMembershipsByClubIds: [],
    byBookClubMemberId: {},
    allBookClubMemberIds: []
};

// book club member reducer
const bookClubMemberReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_USER_MEMBERSHIPS:
            newState = { ...state };
            newState.userMembershipsByClubId = action.bookClubMemberships.reduce((userMemberships, userMembership) => {
                newState.allUserMembershipsByClubIds.push(userMembership.id);
                userMemberships[userMembership.book_club_id] = userMembership;
                return userMemberships;
            }, {});
            return newState;
        case REMOVE_USER_MEMBERSHIP:
            newState = { ...state };
            delete newState.userMembershipsByClubId[action.bookClubId];
            newState.allUserMembershipsByClubIds = newState.allUserMembershipsByClubIds.filter(userMembership => userMembership.book_club_id !== action.bookClubId);
            return newState;
        case LOAD_BOOK_CLUB_MEMBERS:
            newState = { ...state };
            newState.byBookClubMemberId = action.bookClubMembers.reduce((bookClubMembers, bookClubMember) => {
                newState.allBookClubMemberIds.push(bookClubMember.id);
                bookClubMembers[bookClubMember.id] = bookClubMember;
                return bookClubMembers;
            }, {});
            return newState;
        case REMOVE_BOOK_CLUB_MEMBER:
            newState = { ...state };
            delete newState.byBookClubMemberId[action.membershipId];
            newState.allIds = newState.allBookClubMemberIds.filter(userMembership => userMembership.id !== userMembership.membershipId);
            return newState;
        default:
            return state;
    }
};

export default bookClubMemberReducer;

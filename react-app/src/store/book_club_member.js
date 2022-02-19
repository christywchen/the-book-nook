// constants
const LOAD_USER_MEMBERSHIPS = 'bookClubMember/loadUserMemberships';
const ADD_USER_MEMBERSHIP = 'bookClubMember/addUserMembership';
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

export const addUserMembership = (userMembership) => {
    return {
        type: ADD_USER_MEMBERSHIP,
        userMembership
    }
}


export const removeUserMembership = (bookClubId) => {
    return {
        type: REMOVE_USER_MEMBERSHIP,
        bookClubId
    }
}

const loadBookClubMembers = (bookClubId, memberships) => {
    return {
        type: LOAD_BOOK_CLUB_MEMBERS,
        bookClubId,
        memberships
    }
}

const addBookClubMember = (bookClubId, membership) => {
    return {
        type: ADD_BOOK_CLUB_MEMBER,
        bookClubId,
        membership
    }
}

export const removeBookClubMember = (bookClubId, membershipId) => {
    return {
        type: REMOVE_BOOK_CLUB_MEMBER,
        bookClubId,
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

export const createBookClubMember = (id, userId) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${id}/users/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            book_club_id: id,
            user_id: userId
        }),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addBookClubMember(id, data['book club member']));
        return data['book club member'];
    }
}

export const getBookClubMembers = (id) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${id}/users`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBookClubMembers(id, data['book club members']));
    }
}

export const deleteBookClubMember = (id, userId) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${id}/users/${userId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeBookClubMember(id, data['membership id']));
    }
}

// initial state
const initialState = {
    userMembershipsByClubId: {},
    allMembershipsByClubId: {}
};

// book club member reducer
const bookClubMemberReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_USER_MEMBERSHIPS:
            newState = { ...state };
            newState.userMembershipsByClubId = action.bookClubMemberships.reduce((userMemberships, userMembership) => {
                userMemberships[userMembership.book_club_id] = userMembership;
                return userMemberships;
            }, {});
            return newState;
        case ADD_USER_MEMBERSHIP:
            newState = { ...state };
            newState.userMembershipsByClubId = { ...state.userMembershipsByClubId, [action.userMembership.book_club_id]: action.userMembership }
            return newState;
        case REMOVE_USER_MEMBERSHIP:
            newState = { ...state };
            delete newState.userMembershipsByClubId[action.bookClubId];
            return newState;
        case LOAD_BOOK_CLUB_MEMBERS:
            newState = { ...state };
            newState.allMembershipsByClubId[action.bookClubId] = action.memberships.reduce((memberships, membership) => {
                memberships[membership.id] = membership;
                return memberships;
            }, {});
            return newState;
        case ADD_BOOK_CLUB_MEMBER:
            newState = { ...state };
            newState.allMembershipsByClubId[action.bookClubId] = { ...state.allMembershipsByClubId[action.book_club_id], [action.membership.id]: action.membership }
        case REMOVE_BOOK_CLUB_MEMBER:
            newState = { ...state };
            delete newState.allMembershipsByClubId[action.bookClubId][action.membershipId];
            return newState;
        default:
            return state;
    }
};

export default bookClubMemberReducer;
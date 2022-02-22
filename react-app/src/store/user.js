// constants
const LOAD_USERS = 'user/loadUsers';

// action creators
const loadUserMemberships = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

// thunk middlewares
export const getUsers = () => async (dispatch) => {
    const res = await fetch(`/api/users`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadUserMemberships(data['users']));
    }
}

// initial state
const initialState = { byId: {}, allUserIds: [] };

// book club member reducer
const userReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_USERS:
            newState = { ...state };
            newState.byId = action.users.reduce((users, user) => {
                newState.allUserIds.push(user.id);
                users[user.id] = user;
                return users;
            }, {});
            return newState;
        default:
            return state;
    }
};

export default userReducer;

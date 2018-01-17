import {FETCH_USERS} from "../actions/userActions";

const initialState = {users: [], apiError: null};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
        {
            console.log('handling');
            console.log(action);
            return {...state, users: action.users, apiError: action.error};
        }
            
        default:
            return state;
    }
};

export default userReducer;
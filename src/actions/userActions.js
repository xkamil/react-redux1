import Api from "../Api";

export const FETCH_USERS = 'FETCH_USERS';

export function fetchUsers(dispatch) {
    Api.get('/users').then((users) => {
        dispatch({
            type: FETCH_USERS,
            users,
            error: null
        })
    }).catch((error) => {
        dispatch({
            type: FETCH_USERS,
            error
        })
    })
}
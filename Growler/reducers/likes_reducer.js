import {RECEIVE_GROWL_LIKES, RECEIVE_LIKE, RECEIVE_USER_LIKES, DELETE_LIKE} from '../actions/like_actions'

const likesReducer = (state={}, action) => {
    Object.freeze(state);
    debugger;
    switch(action.type){
        case RECEIVE_LIKE:
            debugger;
            return Object.assign({},state,{[action.like.id]: action.like.data});
        case RECEIVE_GROWL_LIKES:
            debugger;
            return action.likes.data;
        case RECEIVE_USER_LIKES:
            debugger;
            return action.likes.data;
        case DELETE_LIKE:
            const newState = Object.assign({}, state);
            delete newState[action.like_id];
            return newState;
        default:
            return state;
    }
}

export default likesReducer;
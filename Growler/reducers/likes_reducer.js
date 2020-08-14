import {RECEIVE_GROWL_LIKES, RECEIVE_LIKE, RECEIVE_USER_LIKES} from '../actions/like_actions'

const likesReducer = (state={}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_LIKE:
            return Object.assign({},state,{[action.like.id]: action.like});
        case RECEIVE_GROWL_LIKES:
            return action.likes;
        case RECEIVE_USER_LIKES:
            return action.likes;
        default:
            return state;
    }
}

export default likesReducer;
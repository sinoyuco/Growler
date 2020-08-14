import * as APIUtil from '../util/like_api_util';

export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const RECEIVE_GROWL_LIKES = "RECEIVE_GROWL_LIKES";
export const RECEIVE_USER_LIKES = "RECEIVE_USER_LIKES";

const receiveLike = (like) => ({
    type: RECEIVE_LIKE,
    like
});

const receiveGrowlLikes = (likes) => ({
    type: RECEIVE_GROWL_LIKES,
    likes
});

const receiveUserLikes = (likes) => ({
    type: RECEIVE_GROWL_LIKES,
    likes
});

export const postLike = (like) => dispatch => {
    return APIUtil.postLike(like).then(like => (
        dispatch(receiveLike(like))
    ))
}

export const fetchGrowlLikes = (growlId) => dispatch => {
    return APIUtil.fetchGrowlLikes(growlId).then(likes => (
        dispatch(receiveGrowlLikes(likes))
    ))
}

export const fetchUserLikes = (userId) => dispatch => {
    return APIUtil.fetchUserLikes(userId).then(likes => (
        dispatch(receiveUserLikes(likes))
    ))
}
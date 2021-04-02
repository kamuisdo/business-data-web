import requestFactory from "../utils/request";

const getUserInfo = requestFactory({ url:'post/user/info',hostType:'REACT_APP_MOCK_HOST' })

export {
    getUserInfo
}
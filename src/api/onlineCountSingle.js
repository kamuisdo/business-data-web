import requestFactory from "../utils/request";

const onlineCountBar = requestFactory({ url:'post/onlineCountSingle/onlineCountSingleLine',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/onlineCountSingle/onlineCountSingleLine' })

const getOnlineRateLine = requestFactory({
    url:'',
    hostType:'REACT_APP_MOCK_HOST',
    mockUrl:'post/onlineCountSingle/getOnlineRateLine'
})

export {
    onlineCountBar,
    getOnlineRateLine
}
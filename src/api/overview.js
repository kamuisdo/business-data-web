import requestFactory from "../utils/request";

const chinaMap = requestFactory({ url:'post/overview/chinaMap',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/overview/chinaMap' })

const onlineCountLine = requestFactory({ url:'post/overview/onlineCountLine',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/overview/onlineCountLine' })

export {
    chinaMap,
    onlineCountLine
}
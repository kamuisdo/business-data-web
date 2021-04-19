import requestFactory from "../utils/request";

const getHabitsSingleLine = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/habits/getHabitsSingleLine' })

const getHabitsMultiLine = requestFactory( {url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/habits/getHabitsMultiLine' })

export {
    getHabitsSingleLine,
    getHabitsMultiLine
}
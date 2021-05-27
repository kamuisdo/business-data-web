import isNumber from "lodash/isNumber";

function parseVal(val){
    return isNumber(val) ? val.toFixed(2) : '-'
}

export {
    parseVal
}
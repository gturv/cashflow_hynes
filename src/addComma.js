String.prototype.insert = function(idx, item) {
    if (idx < 0) {
        idx = this.length + idx;
        if (idx < 0) {
          idx = 0;
        }
    }
      return this.slice(0, idx) + (item || "") + this.slice(idx, this.length);
}

function addComma(num) {
    const stringNum = num.toString()//typeof num !== "string" ? num.toString() : num
    const secondLastIndex = stringNum.length - 2

    const oneDecimal = stringNum.charAt(secondLastIndex) === '.' ? true : false

    const stringNumber = oneDecimal ? stringNum + "0" : stringNum
    const thirdLastIndex = stringNumber.length - 3
    const twoDecimals = stringNumber.charAt(thirdLastIndex) === '.' ? true : false
    const negative = stringNumber.charAt(0) === "-" ? true : false

    if (stringNumber.length < 8 && twoDecimals && negative ) {
        return stringNumber
    }
    if (twoDecimals && stringNumber.length > 9 && negative) {
        return stringNumber.insert(-6, ',')
    }
    if (stringNumber.length < 7 && twoDecimals ) {
        return stringNumber
    }
    if (!twoDecimals && stringNumber.length < 4) {
        return stringNumber
    }
    if (twoDecimals && stringNumber.length > 9) {
        const y = stringNumber.insert(-6, ',')
        return y.insert(-10, ",")
    }
    if (twoDecimals && stringNumber.length > 6) {
        return stringNumber.insert(-6, ',')
    }
    if(!twoDecimals && stringNumber.length > 6) {
        const y = stringNumber.insert(-3,',')
        return y.insert(-7,",")
    }
    if(!twoDecimals && stringNumber.length > 3) {
        return stringNumber.insert(-3,',')
    }
    return stringNumber
} 

export default addComma
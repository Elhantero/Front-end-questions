// const getFactorial = (n) => {
//     if(!n) return 0;
//     return Array
//         .from(Array(n))
//         .map((_, idx) => idx + 1)
//         .reduce((acc, currentValue) => {
//            return currentValue * acc
//         }, 1)
// };

const getFactorial = (n) => {
    return n ? n * getFactorial(n - 1) : 1
}


console.log(getFactorial(5), 'factorial.js', 12)
console.log(getFactorial(6), 'factorial.js', 12)
console.log(getFactorial(7), 'factorial.js', 12)
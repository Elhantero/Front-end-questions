// вирівняти масив на n рівнів

const testArr = [
    1,
    [2],
    [[3, 4]],
    [[[5, 6]]],
    [[[[7, 8]]]]
]


const flatArr = (arr = [], n = 1) => {
    const res = [...arr];

    for(let i = n; i >= 1; i--) {
        res.forEach((o, idx) => {
            if(Array.isArray(o)) {
                res.splice(idx, 1, ...o)
            }
        })
    }
    console.log(res, 'arrFlat.js', 28)
    return res;
};


flatArr(testArr, 3);
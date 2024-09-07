// const makeMemo = (func) => {
//     const mapa = {};
//     return function() {
//         const key = Array.from(arguments).join('_');
//         if(mapa[key]) return mapa[key];
//         const res = func.apply(this, arguments);
//         mapa[key] = res;
//         return res;
//     }
// };
//
//
// const slowFunc = (a, b) => a + b;
//
// const memoizedSlowFunc = makeMemo(slowFunc);
//
// memoizedSlowFunc(2, 3);
// memoizedSlowFunc(2, 3);
// memoizedSlowFunc(2, 4);
// memoizedSlowFunc(2, 3);


const makeMemo = (f) => {
    const mapa = {};
    return async function () {
        const [args] = Array.from(arguments);
        const key = Object.values(args).join('__');
        if (mapa[key]) return mapa[key];
        const res = await f.apply(null, arguments).then(r => r);
        mapa[key] = res;
        console.log(res, 'memoization.js', 31)
        return res;
    }
}

const func = async (params, timer) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(params.a + params.b), timer)
    })
};

const memoizedFunc = makeMemo(func);

memoizedFunc({ a: 7, b: 8 }, 1000).then(r => console.log(r, 'memoization.js', 39)).then(() => {
    memoizedFunc({ a: 7, b: 8 }, 50000).then(r => console.log(r, 'memoization.js', 40));
})

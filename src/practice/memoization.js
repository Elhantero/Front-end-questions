const makeMemo = (func) => {
    const mapa = {};
    return function() {
        const key = Array.from(arguments).join('_');
        if(mapa[key]) return mapa[key];
        const res = func.apply(this, arguments);
        mapa[key] = res;
        return res;
    }
};


const slowFunc = (a, b) => a + b;

const memoizedSlowFunc = makeMemo(slowFunc);

memoizedSlowFunc(2, 3);
memoizedSlowFunc(2, 3);
memoizedSlowFunc(2, 4);
memoizedSlowFunc(2, 3);
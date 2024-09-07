// Функція для глибокого порівняння об'єктів:
// Реалізувати функцію, яка виконує глибоке порівняння двох об'єктів (включаючи вкладені об'єкти і масиви).

function deepCompare(a, b) {
    if(a === b) return true;

    const getStrictType = (o) => {
        if(typeof o !== 'object') return typeof o;
        if(o === null) return 'null';
        if(Array.isArray(o)) return 'array';
        return 'object';
    };

    // const bothIterable = (a1, a2) => {
    //     return ['object', 'array'].includes(getStrictType(a1)) && ['object', 'array'].includes(getStrictType(a2));
    // }
    const bothArrays = (a1, a2) => {
        return getStrictType(a1) === getStrictType(a2)
            && getStrictType(a1) ==='array'
            && getStrictType(a2) ==='array'
    };

    const bothObjects = (a1, a2) => {
        return getStrictType(a1) === getStrictType(a2)
            && getStrictType(a1) ==='object'
            && getStrictType(a2) ==='object'
    };

    if(getStrictType(a) !== getStrictType(b)) return false;

    let isEqual = true;

    const innerFunction = (a, b) => {
        Object.keys(a).forEach(key => {
            if(!b.hasOwnProperty(key)) {
                isEqual = false;
            } else if (bothArrays(a[key], b[key]) || bothObjects(a[key], b[key])) {
                innerFunction(a[key], b[key]);
            } else if (a[key] !== b[key] && getStrictType(a[key]) === getStrictType(b[key])) {
                isEqual = false;
            }
        })
    }
    innerFunction(a, b);
    innerFunction(b, a);
    return isEqual;
};

const obj1 = {
    a: 1,
    b: {
        a: 2,
        c: {
            a: 3,
            d: {
                a: 4
            }
        }
    }
};

const obj2 = {
    a: 1,
    b: {
        a: 2,
        c: {
            a: 3,
            d: {
                a: 4
            }
        }
    }
};

const isEqual = deepCompare(obj1, obj2);

console.log(isEqual, 'test1.js', 51)









// Функція для глибокого порівняння об'єктів:
// Реалізувати функцію, яка виконує глибоке порівняння двох об'єктів (включаючи вкладені об'єкти і масиви).

const deepCompare = (a, b) => {
    let res = true;

    const getStrictType = (o) => {
        if(Array.isArray(o)) return 'array';
        if(o === null) return 'null';
        return typeof o;
    }
    const inner = (a, b) => {
        if (a === b) return true;

        if( getStrictType(a) !== getStrictType(b)
            || (typeof a !== 'object' || typeof b !== 'object')
            || Object.keys(a).length !== Object.keys(b).length)
        {
            res = false;
            return;
        }
        const keys = Object.keys(a);
        keys.forEach(key => {
            if(!b.hasOwnProperty(key)) {
                res = false;
                return;
            }
            inner(a[key], b[key]);
        })
    };

    inner(a, b);

    return res;
}

const obj1 = {
    a: 1,
    b: {
        a: 2,
        c: {
            a: 3,
            d: {
                a: 6
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

console.log(deepCompare(obj1, obj2), 'deepCompare.js', 39);

const obj3 = structuredClone(obj1);

console.log(obj3, 'deepCompare.js', 67)
//Тротлінг: Реалізувати функцію тротлінгу, яка дозволяє викликати функцію не частіше ніж раз на певний проміжок часу.

const func = () => {
    console.log('this is our func', 'debounce.js', 4)
    return 1;
};

const makeThrottle = (f, ms) => {
    let timer;
    return () => {
        if(!timer) {
            timer = setTimeout(() => {
                f();
                timer = null;
            }, ms);
        }
    }
}

const throttledFunc = makeThrottle(func, 3000);

const promiseFunc = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(500, 'throtling.js', 25)
            resolve(throttledFunc())
        }, 500)
    })
}

const testingFunc = async () => {
    const arr = Array(100);

    for(const i of arr) {
        await promiseFunc();
    }

}

testingFunc()

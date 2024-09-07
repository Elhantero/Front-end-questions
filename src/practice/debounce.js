//Дебаунсінг: Реалізувати функцію, яка обгортає іншу функцію для
// обмеження її викликів до одного разу за певний проміжок часу (дебаунсінг).

const func = () => console.log('this is our func', 'debounce.js', 4);

const makeDebounce = (f, ms) => {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => f(), ms);
    }
}

const debouncedFunc = makeDebounce(func, 2000);

for(let i = 0; i <= 1000; i++ ) {
    debouncedFunc();
}


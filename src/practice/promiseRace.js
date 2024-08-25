const promiceRace = (promices) => {
    return new Promise((resolve, reject) => {
        promices.forEach(p => {
            p.then(res => resolve(res))
                .catch(err => reject(err));
        })
    })
};

const promise1 = new Promise((resolve, reject) => {
    // setTimeout(() => resolve('ok1'), 1000)
    setTimeout(() => reject('err 1'), 100)
})
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('ok2'), 0)
})
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('ok3'), 500)
});

promiceRace([
    promise1,
    promise2,
    promise3,
]).then(res => console.log(res, 'promiseRace.js', 25))
    .catch(err => console.log(err, 'promiseRace.js', 26));

Promise.all = function (arrOfPromise, timeLimit) {
    const start = new Date().getTime();
    return new Promise((resolve, reject) => {
      const res = [];
      let readyCounter = 0;
      arrOfPromise.forEach((p,idx) => {
        p.then(r => {
            console.log(res, 'promiseAll.js', 8);
            const end = new Date().getTime();
            if(timeLimit && end - start > timeLimit) reject('timeout error')
            res[idx] = r;
            readyCounter++;
            if(readyCounter === arrOfPromise.length) resolve(res);
        })
            .catch(err => reject(err))  
      })
    })
};


const promise1 = new Promise(((resolve, reject) => {
    setTimeout(() => resolve('ok1'), 2990)
}));

const promise2 = new Promise(((resolve, reject) => {
    setTimeout(() => resolve('ok2'), 1500)
}));

Promise.all([
    promise1,
    promise2,
], 3000).then(res => console.log(res, 'promiseAll.js', 20)).catch(err => console.log(err, 'promiseAll.js', 27))

// {status:"fulfilled", value:результат} для успешных завершений,
// {status:"rejected", reason:ошибка}

const promiseSettled = (promises = []) => {
    const res = [];
    let readyCounter = 0;
    return new Promise((resolve) => {
        promises.forEach((p, idx) => {
            p.then(r => {
              res[idx] = {
                  status: 'fulfilled',
                  value: r,
              };
              readyCounter++;
              if(readyCounter === promises.length) resolve(res);
            }).catch(error => {
                res[idx] = {
                    status: 'rejected',
                    reason: error,
                }
                readyCounter++;
                if(readyCounter === promises.length) resolve(res);
            })
        })
    })
};


const promise1 = new Promise((resolve, reject) => {
   setTimeout(() => resolve('ok1'), 1000)
});

const promise2 = new Promise((resolve, reject) => {
    reject(new Error('error ok2'));
})

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('ok3'), 2000)
});

promiseSettled([
    promise1,
    promise2,
    promise3,
]).then(res => console.log(res, 'promiseSettled.js', 23))
    .catch(err => console.log(err, 'promiseSettled.js', 24))

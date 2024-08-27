// var a = {
//     firstName: 'Bill',
//     lastName: 'Ivanov',
//     sayName: function() {
//         console.log(this.firstName)
//     },
//     sayLastName: () => {
//         console.log(this.lastName)
//     }
// };
//
// a.sayName(); // Bill
//
// var b = a.sayName;
//
// b(); // undefined
//
// a.sayName.bind({ firstName: 'Boris' })(); // Boris
//
// a.sayName(); // Bill
//
// a.sayLastName(); // undefined
//
// a.sayName.bind({ firstName: 'Boris'}).bind({ firstName: 'Tom' })(); // Boris
//
// a.sayLastName.bind({ lastName: 'Petrov' })() // undefined



// new Promise((resolve, reject) => {
//     console.log('promise', 'ths.js', 32)
//     reject();
// }).then(res => console.log(1, 'ths.js', 34))
//     .catch(err => console.log('err', 'ths.js', 35))
//     .catch(err => console.log('err2', 'ths.js', 35))
//     .finally(() => console.log('finally', 'ths.js', 36))
//     .then(res => console.log(2, 'ths.js', 34))
//     .then(res => console.log(3, 'ths.js', 34));



// let i = 0;

// while (i < 10) {
//     const temp = i;
//     i++;
//     setTimeout(() => console.log(temp, 'ths.js', 45))
// // }
// while (i < 10) {
//     ((j) => {
//         i++;
//         setTimeout(() => console.log(j, 'ths.js', 45))
//     })(i)
// }
//
//
// while (i < 10) {
//     i++;
//     setTimeout((j) => console.log(j, 'ths.js', 45), 0 , i)
// }

setTimeout(() => console.log(1, 'ths.js', 62))

const promise = new Promise((resolve, reject) => {
    console.log('promise', 'ths.js', 32)
    resolve(new Promise(resolve => resolve(3)));
});

setTimeout(() => console.log(2, 'ths.js', 69))

promise.then(res => console.log(res, 'ths.js', 71))

// promise
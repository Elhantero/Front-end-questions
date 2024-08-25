function sum (a) {
    console.log(a, 'sum.js', 5);
    return function (b) {
        return sum(a + b);
    }
};


sum(1)(2)(3)(4)(5)(6);
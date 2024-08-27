const arr = [1];


arr.__proto__.mapi = 111;


console.log(arr.mapi, 'proto.js', 7)
let obj = {};


let num = 1
obj[`${num}`] = {
    james: 'Hello World'
};


let num2 = 2
obj[`${num2}`] = {
    james: 'Hello World'
};

// var obj1 = {
//     foo: 'bar',
//     x: 42
// };
// var obj2 = {
//     foo: 'baz',
//     y: 13
// };

// var clonedObj = {
//     ...obj1
// };
// // Object { foo: "bar", x: 42 }

// var mergedObj = {
//     ...obj1,
//     ...obj2
// };
// // Object { foo: "baz", x: 42, y: 13 }

// let arr1 = {
//     '1': '2'
// }
// let arr2 = {
//     '3': '4'
// }

// arr3 = {
//     ...arr1,
//     ...arr2
// }

// console.log(arr3)
// {
//   ...state,
//   myPosts: {
//     ...state.myPosts,
//     isPending: true
//   }
// }

// remember to pass object id into one of the onChange events 
console.log(obj)
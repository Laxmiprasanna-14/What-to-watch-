//case1
//console.log(name); reference error
// console.log("Hello World!");

// //case 2
// console.log(name);
// var name = "Chetan"; // Output: undefined (due to hoisting)
//  // Chetan
//  console.log(name); // Output: Chetan
 //case 3
 //console.log(name);
//  function printName() {
//     console.log(name); // Output: undefined (due to hoisting)
//     var name = "Chetan"; // Variable declaration is hoisted, but assignment is not
//     console.log(name); // Output: Chetan
//    var name = "Chetan";
//     // Output: ReferenceError: Cannot access 'name' before initialization
    
//  }
// // case 4
// console.log(name); // Output: ReferenceError: Cannot access 'name' before initialization
// let name = "Chetan";
// let x=null;
// console.log(x); // Output: undefined (let variables are not hoisted like var)
console.log(typeof Infinity)
console.log(typeof Math.sqrt(-1)); 
console.log("heloo"*3); // Output: NaN
console.log("hello" * 3); // Output: NaN
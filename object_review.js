// Object = dinamic collction of keys and values of any data type;
const name = {
    key: 'value',
    second_key: null 
};

// We can add or remove properties at any moment - delete operator
let removingProp = {
    name: 'Matheus',
    age: 4
};

removingProp.newAge = 9; /// Add a method in the object
delete removingProp.age; // remove a method from the object

//Ways we can add a property
const property = {};

property['first'] = 'First Name';
property.second = 'Second Name';

const third = 'Third Name';
property[third] = third
console.log(property)

//Node.js - 2009 - developing node - //joyent//
//io.js - "versão de node" 2014 - 2015 
//Node.v4 = io.js v3.3 + Node.v0.12
// Open Source code - conjunction - v8, from google, and libuv

//Timers: book a function's execution;

setTimeout(() => {
    console.log(varchar)
}, 3000)
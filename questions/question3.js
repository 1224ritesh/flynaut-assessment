let obj1 = { "greeting": "hello" };
let obj2 = obj1;
obj1["greeting"] = "Bye";
console.log(obj1);
console.log(obj2);

// Output:
// { greeting: 'Bye' }
// { greeting: 'Bye' }
//In JavaScript, objects are actually passed by reference, and assigning an object to a new variable creates a reference to the same object in memory. 
//So, changing the property of one object will change the property of all the references to that object.
// In the above example, obj1 and obj2 are pointing to the same object in memory. So, when change the value of obj1, obj2 also changes. This is called shallow copy.

 

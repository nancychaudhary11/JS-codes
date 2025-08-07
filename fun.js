/** Creating a simple object
const student = {
  name: "Nancy",
  age: 21,
  course: "B.Tech",
  isGraduated: false,
  
  // Method inside the object
  greet: function() {
    console.log("Hello, my name is " + this.name);
  }
};

// Accessing properties
console.log(student.name);       // Output: Nancy
console.log(student.age);        // Output: 21

// Calling the method
student.greet();                 // Output: Hello, my name is Nancy
**/

function fun(){
  console.log(arguments);
}
fun(1, 2, 3, 4, 5); 
/** fun with no arg and no return*/
var hello =() => console.log("Hello World!")
hello()

/** fun with parameters and return*/
var sum = (a,b) => a+b
console.log(sum(5,6))

/** fun with single parameter and return*/
var square = x => x*x
console.log(square(5))

/** fun with no parameter and return*/
var pi = () => 3.14
console.log(pi())

/** fun with multiple statements*/
var factorial = n => {
    let fact = 1
    for(let i=1;i<=n;i++){
        fact *= i
    }
    return fact
}
console.log(factorial(1))
console.log(factorial(2))


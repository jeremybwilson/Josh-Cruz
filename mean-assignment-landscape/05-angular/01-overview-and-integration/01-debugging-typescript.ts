// Problem 1
var myString: string;
// I can assign myString like this:
myString = 'Bee stinger';
// Why is there a problem with this? What can I do to fix this?
myString = "9";
// I changed the type of the var to a string from an int.

// Problem 2
function sayHello(name: any) {
  // changed the type to accept anything
  return `Hello, ${name}!`;
}
// This is working great:
console.log(sayHello('Kermit'));
// Why isn't this working? I want it to return "Hello, 9!"
console.log(sayHello(9));

// Problem 3

function fullName(firstName: string, lastName: string, middleName?: string) {
  // I made the middle name param optional
  let fullName = `${firstName} ${middleName} ${lastName}`;
  return fullName;
}
// This works:
console.log(fullName('Mary', 'Moore', 'Tyler'));
// What do I do if someone doesn't have a middle name?
console.log(fullName('Jimbo', 'Jones'));

// Problem 4
interface Student {
  firstName: string;
  lastName: string;
  belts: number;
}
function graduate(ninja: Student) {
  return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${
    ninja.belts
  } belts!`;
}
const christine = {
  firstName: 'Christine',
  lastName: 'Yang',
  belts: 2,
};
const jay = {
  firstName: 'Jay',
  lastName: 'Patel',
  belts: 4,
  // Fixed wrong attribute name
};
// This seems to work fine:
console.log(graduate(christine));
// This one has problems:
console.log(graduate(jay));

// Problem 5

class Ninja {
  fullName: string;
  constructor(public firstName: string, public lastName: string) {
    this.fullName = `${firstName} ${lastName}`;
  }
  debug() {
    console.log('Console.log() is my friend.');
  }
}
// This is not making an instance of Ninja, for some reason:
const shane = new Ninja('shane', 'isLame');
// added "new" keyword and put in necessary parameters

// Since I'm having trouble making an instance of Ninja, I decided to do this:
const turing = new Ninja('Alan', 'Turing');
// I changed turing into a Ninja because the function below required a Ninja

// Now I'll make a study function, which is a lot like our graduate function from above:
function study(programmer: Ninja) {
  return `Ready to whiteboard an algorithm, ${programmer.fullName}?`;
}
// Now this has problems:
console.log(study(turing));

// Problem 6

var increment = x => x + 1;
// This works great:
console.log(increment(3));
// Addded () around the parameter

var square = x => x * x;
// This is not showing me what I want:
console.log(square(4));
// Addded () around the parameter

// This is not working:
var multiply = (x, y) => x * y;
// Addded () around the parameter

// Nor is this working:
var math = (x, y) => {
  let sum = x + y;
  let product = x * y;
  let difference = Math.abs(x - y);
  return [sum, product, difference];
};
// Addded {} around the function

// Problem 7

class Elephant {
  age: number;
  constructor(age: number) {
    this.age = age;
  }
  // fixed the consturctor parameter
  birthday = () => {
    return this.age++;
  };
  // changed the fuinction to an arrow func
}
const babar = new Elephant(8);
setTimeout(babar.birthday, 1000);
setTimeout(function() {
  console.log(`Babar's age is ${babar.age}.`);
}, 2000);
// Why didn't babar's age change?
//Fix this by using an arrow function in the Elephant class.

// Prototypal inheritance
var parent = {
    value: "parent value",
    obj: {
        objValue: "parentObjValue"
    }, 
    walk: function()
    {
        console.log("walking!");
    }
}

// Create child object based on parent, it will have prototypal inheritance 
var child = Object.create(parent); 

// you should see that the child has the same values for the members we are asking for as the parent: 
// the parent is serving as our prototype
console.log("CHILD - child.value: " + child.value); 
console.log("CHILD - child.obj.objValue: " + child.obj.objValue);
console.log("PARENT - parent.value: " + parent.value); 
console.log("PARENT - parent.obj.objValue: " + parent.obj.objValue);
console.log("parent: ", parent); 
console.log("child: ", child);

child.value = "childValue"
child.obj.objValue = "childObjValue"; 
console.log("*** CHANGED: child.value='childValue'");
// This will change obj.objValue in the parent, because the obj exists on the parent, so 
// JS will go up the prototype chain and 
// change the objValue in the parent! To prevent that, we need to create a new obj in the 
// child, we need to MASK the property name, otherwise we are operating on the same object instances
console.log("*** CHANGED: child.obj.objValue='childObjValue'");
console.log("CHILD - child.value: " + child.value); 
console.log("CHILD - child.obj.objValue: " + child.obj.objValue);
console.log("PARENT - parent.value: " + parent.value); 
console.log("PARENT - parent.obj.objValue: " + parent.obj.objValue);
console.log("parent: ", parent); 
console.log("child: ", child);

console.log("child.obj === parent.obj ?", child.obj === parent.obj);

var grandChild = Object.create(child); 
console.log("Grandchild: ", grandChild); 
grandChild.walk();

// Function used as constructor
function Dog(name)
{
    this.name = name; 
    console.log("'this' is: ", this);
}

var myDog = new Dog("Max");
console.log("myDog: ", myDog);

// Not used as a function constructor
Dog("Max2");
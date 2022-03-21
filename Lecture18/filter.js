var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numberArray);

function above5Filter(value)
{
    return value > 5; 
}

var filteredNumberArray = numberArray.filter(above5Filter);
console.log("Filered number array: " + filteredNumberArray);

// Another filter
var shoppingList1 = [
    "Milk",
    "Donuts",
    "Cookies",
    "Chocolate",
    "Peanut Butter",
    "Pepto Bismol",
    "Pepto Bismol (Chocolate flavor)",
    "Pepto Bismol (Cookie flavor)"
];

var searchValue = "Bismol"; 
function containsFilter(value)
{
    return value.indexOf(searchValue) != -1;
}

var searchedShoppingList = shoppingList1.filter(containsFilter);
console.log("Searched shopping list: " + searchedShoppingList);
// let finalPairs = {
//     Amy:
// }


class Person {
    constructor(name, significantOther, lastYearRecipient) {
        this.name = name;
        this.significantOther = significantOther;
        this.lastYearRecipient = lastYearRecipient;
        this.thisYearRecipient;
    }
}

// Restriction One: Can't pick yourself
function checkIfYourself(santa, potentialChoice) {
    let result = (santa.name === potentialChoice.name);
    return result;
}

// Restriction Two: Can't pick your significant other
function checkIfSignificantOther(santa, potentialChoice) {
    let result = (santa.significantOther === potentialChoice.name);
    return result;
}

// Restriction Three: Can't pick your significant other
function checkIfLastYearRecipient(santa, potentialChoice) {
    let result = (santa.lastYearRecipient === potentialChoice.name);
    return result;
}

// Check all Restrictions.
// True: choice violated a restriction
// False: choice did not violate a restriction
function checkRestrictions(santa, potentialChoice) {
    let result = false;
    let isYourself = checkIfYourself(santa, potentialChoice);
    let isSignificantOther = checkIfSignificantOther(santa, potentialChoice);
    let isLastYearRecipient = checkIfLastYearRecipient(santa, potentialChoice);
    result = (isYourself || isSignificantOther || isLastYearRecipient);
    return result;
}

function createListOfSantas() {
    let andy = new Person("Andy", "Amy", "Emily");
    let amber = new Person("Amber", "Zach", "Sarah");
    let amy = new Person("Amy", "Andy", "Alex");
    let alex = new Person("Alex", "Lizeth", "Amber");
    let emily = new Person("Emily", "Xavier", "Zach");
    let lizeth = new Person("Lizeth", "Alex", "NA");
    let michael = new Person("Michael", "Sarah", "NA");
    let sarah = new Person("Sarah", "Michael", "Amy"); 
    let zach = new Person("Zach", "Amber", "Andy");
    
    let listOfSantas = [andy, amber, amy, alex, emily, lizeth, michael, sarah, zach];
    return listOfSantas;
}

// shuffle the list
function shuffle(listOfSantas) {
    let shuffledResult = listOfSantas
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return shuffledResult;
}

function attemptDraw(listOfSantas) {
    successfulDraw = false;
    let namesInTheBowl = shuffle(listOfSantas);
    for(let i = 0; i < listOfSantas.length; i++) {
        santa = listOfSantas[i];
        personChosenFromBowl = namesInTheBowl[i];
        if(checkRestrictions(santa, personChosenFromBowl)) {
            successfulDraw = false;
            return [successfulDraw, listOfSantas];
        }
        else {
            listOfSantas[i].thisYearRecipient = namesInTheBowl[i].name;
            successfulDraw = true;
        }
    }
    return [successfulDraw, listOfSantas]; 
}

// Add this year's recipient to each santa
// Main Algorithm:
// 1. Shuffle List
// 2. Iterate through each person
// 3. 
function createThisYearsSecretSantas(listOfSantas) {
    let successfulDraw = false;
    let drawResult = listOfSantas;

    while(successfulDraw === false) {
        drawResult = attemptDraw(listOfSantas);
        successfulDraw = drawResult[0];
        console.log("failure");
    }
    console.log("success");
    let finalResult = drawResult[1];
    return finalResult;
}

function formatResult(finalResult) {
    santas = [];
    recipients = [];
    formattedResult = "";
    for(let i = 0; i < finalResult.length; i++) {
        santa = finalResult[i].name;
        recipient = finalResult[i].thisYearRecipient;
        formattedResult += `Santa: ${santa}, Recipient: ${recipient}<br>`;
    }
    return formattedResult;
}

function main() {
    let listOfSantas = createListOfSantas();
    let finalResult;
    let btn = document.createElement("button");
    btn.innerHTML = "Generate Secret Santas";
    btn.onclick = function () {
        finalResult = createThisYearsSecretSantas(listOfSantas);
        str = formatResult(finalResult);
        document.getElementById("secret_santa_list").innerHTML = str;

    };
    document.body.appendChild(btn);
    
    
    console.log(str);

}

main();


//amber.thisYearRecipient = "Emily"


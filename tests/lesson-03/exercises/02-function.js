// #1. BMI 
function calculateBMI(height, weight){
    let bmi = weight / (height * height);
    if (bmi < 18.5) return "Thiếu cân";
    else if (bmi >= 18.5 && bmi < 25) return "Thừa cân";
    else if (bmi >= 25 && bmi < 30) return "Bình thường";
    else return "Béo phì";
}
console.log(calculateBMI(1.64, 54));

// comvert temperature
function convertTemperature(temperature, type){
    if (type === 'C') {
        return temperature * 9 / 5 +32;
    }
    else if (type === 'F') {
        return (temperature - 32) * 5 / 9;
    }
    else return "Invalid temperature type."
}
console.log(convertTemperature(0, 'C'));
// Filter Prime
function isPrime(number){
    if (number < 2) return false;
    for (let i = 2; i <= Math.sqrt(number); i++){
        if (number % i === 0) return false;
    }
    return true;
}
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
numbers.forEach(number => {
    if (isPrime(number)) console.log(number);
});
// Update email
const users = [
    { name: "Mia", email: "mia@gmail.com" },
    { name: "Xiu", email: "xiu@gmail.com" },
    { name: "Amber", email: "amber@gmail.com" },
    { name: "Mia", email: "amber@gmail.com" }
];
function updateEmail(name, newEmail){
    for (let user in users) {
        if (users[user].name === name) {
            users[user].email = newEmail;
        }
    }
}
updateEmail("Mia", "miamia@gmail.com");
console.log(users);
// Calculate the average score
function calculateAverageScore(students) {
    if (students.length === 0) return 0;
    let total = 0;
    for (let i = 0; i < students.length; i++) {
        total += students[i].score;
    }
    return total / students.length;
}
const studentList = [
    { name: "Mia", score: 85 },
    { name: "Xiu", score: 90 },
    { name: "Amber", score: 95 }
];
console.log(`Average score of student: ${calculateAverageScore(studentList)}`);

// Ticket price 
function ticketPriceByAge(age){
    if (age < 0) {
        console.log("Invalid age");
    } 
    else if (age < 5) {
        console.log("Free");
    } 
    else if (age >= 6 && age <= 17) {
        console.log("Ticket Price: 50,000 VND");
    } 
    else {
        console.log("Ticket Price: 100,000 VND");
    } 
}
// Month name
function getNameOfMonth(number){
    switch (number) {
        case 1: return "January";
        case 2: return "February";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
        default: return "Invalid input. Only allow number from 1 - 12";
  }
}
getNameOfMonth(12);
// Weather status
function weatherStatus(temp){
    if (temp >= 30) console.log(`${temp}: Hot`)
    else if (temp >= 20 && bmi < 30) console.log(`${temp}: Cool`)
    else return console.log(`${temp}: Cold`);
}
weatherStatus(12);
let student = {
    name: "Mia",
    className: "P103",
    age: 23,
    address: {
        number: 12,
        street: "Nguyen Chi Thanh",
        city: "Ha Noi",
        "street 2": "hehe"
    }
};

console.log(student.className);
console.log(student["address"]["street 2"]);

student.age = 25;
console.log(student.age);
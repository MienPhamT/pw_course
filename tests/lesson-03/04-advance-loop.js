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

for (let property in student){
    console.log(property);
    console.log(student[property]);
}

// for each: use for array

const arr = ["Lua", "Mien", "Phuoc", 23, false, { name: "Mia Mia", address: "Ha Noi" }];

arr.forEach((value, index)=>{
    console.log(value , index);
})

// for... of : dung de lap cac gia tri trong array

for (i of arr){
    console.log(i);
}

let fruit = "bannaa";
for (let char of fruit){
    console.log(char);
}
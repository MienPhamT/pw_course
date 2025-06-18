// In ra tên và giá trị của mỗi thuộc tính trong một đối tượng.
const student =  {"name": "Mia", "age": 12};
for (let el in student){
    console.log(`${el}: ${student[el]}`);
}
// Tính tổng các giá trị số của các thuộc tính trong một đối tượng.
const student1= {"name": "Mia", "age": 12, "salary": 100};
let total = 0;
for (let el in student1){
    if (typeof student1[el] === "number"){
        total += student1[el];
    }
}
console.log(total);
// Tạo một mảng chứa tất cả các tên thuộc tính của một đối tượng.
const student2= {"name": "Mia", "age": 12, "salary": 100};
let arr = [];
for (let el in student2){
    arr.push(el);
}
console.log(arr);
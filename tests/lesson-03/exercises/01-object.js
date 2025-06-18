// #1. Tạo một object student và truy cập đến điểm môn toán (math) sử dụng ngoặc vuông. Biết object student bao gồm 2 thuộc tính: name và grades. Trong đó grades là một object với 2 thuộc tính kiểu number: math và english
let student = {
    name: "Mien",
    grades: {
        math: 9.5,
        english: 9
    }
}
console.log(`Diem mon toan cua ${student["name"]} la: ${student["grades"]["math"]}`);
// #2. Tạo một object product với các thuộc tính là tên các sản phẩm và giá trị là giá của chúng. Dùng vòng lặp for...in để in ra tên và giá của mỗi sản phẩm.
const product = {
    "iphone 6": 100,
    "iphone 7": 200,
    "iphone 8": 300,
    "iphone 9": 400,
    "iphone 10": 500,
}
for(let item in product){
    console.log(item + ": $" + product[item]);
}
// #3. Tạo một object bike và sau đó thêm thuộc tính color vào object đó
let bike = {
    brand: "Viet Nhat",
    type: "Dia Hinh"
}
bike.color = "Pink";
console.log(bike);
// #4. Tạo một object employee với các thuộc tính: name, age và xóa thuộc tính age khỏi object này
let employee = {
    name: "Mia",
    age: 26
}
delete employee.age
console.log(employee);
/*
Một trường học có các lớp học và học sinh như sau:
○ classA: An, Bình, Châu
○ classB: Đào, Hương, Giang
Hãy viết code để đáp ứng yêu cầu sau:
- Khai báo tên biến: school
- Tên class là tên thuộc tính, giá trị của các thuộc tính này là một mảng chứa
tên các học sinh
 */
let school = {
    classA: ["An", "Bình", "Châu"],
    classB: ["Đào", "Hương", "Giang"]
}
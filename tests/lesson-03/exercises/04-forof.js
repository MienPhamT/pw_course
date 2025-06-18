// Tạo mảng chứa các kí tự nghịch đảo từ một chuỗi đã cho -> Dua vao bai tap for
const str = "xin chao nha";
let arr = [];
for (let i = 0; i < str.length; i++){
    arr.push(str[str.length - i - 1]);
}
console.log(arr);
// Lọc ra tất cả các phần tử duy nhất trong một mảng.
const arr1 = [1, 2, 3, 1, 2, 4, 5];
let count = {};
let newArr = [];
for (let el of arr1){
    count[el] = (count[el] || 0) + 1;
}
for (let el of arr1){
    if (count[el] === 1) newArr.push(el);
}
console.log(newArr);

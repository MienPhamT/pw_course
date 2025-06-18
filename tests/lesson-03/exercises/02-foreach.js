// In ra tất cả các phần tử của một mảng.
const arr = [1, 2, 3];
arr.forEach(i => {
    console.log(i);
});
// Tính tổng, tìm giá trị lớn nhất và nhỏ nhất trong một mảng.
const arr1 = [1, 2, 3];
let max = arr1[0];
let min = arr1[0];
let sum = 0;
arr.forEach(i => {
    if (max < i) max = i;
    if (min > i) min = i;
    sum += i;
});
console.log(`So lon nhat la: ${max}, So nho nhat la ${min}, Tong cac phan tu cua mang la ${sum}`);
// Tạo một mảng mới từ một mảng đã cho, trong đó mỗi phần tử được nhân đôi.
const arr2 = [1, 2, 3];
let newArr = [];
arr2.forEach(i => {
    newArr.push(i*2);
})
console.log(newArr);
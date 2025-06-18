// Tinh tong tu 1-100
let sum = 0;
for (i = 1 ; i <= 100 ; i++){
    sum += i ;
}
console.log (sum);
// In bang cuu chuong tu 2 - 9
for (i = 1 ; i <= 9 ; i++){
    for (j = 1 ; j <= 9 ; j++){
        console.log(`${i} * ${j} = ${i*j}`);
    }
    console.log("");
}
// Tạo một mảng chứa các số lẻ từ 1 đến 99.
let arr = [];
for (i = 1 ; i <= 99 ; i = i +2){
    arr.push(i);
}
console.log(arr);
// Tính tổng doanh thu của 12 tháng trong năm dựa trên mảng doanh thu đã cho và in ra tổng doanh thu.
let totalRevenue = 0;
const revenue =[
    { "month": 1, "total": 100 },
    { "month": 2, "total": 100 },
    { "month": 3, "total": 100 },
    { "month": 4, "total": 100 },
    { "month": 5, "total": 100 },
    { "month": 6, "total": 100 },
    { "month": 7, "total": 100 },
    { "month": 8, "total": 100 },
    { "month": 9, "total": 100 },
    { "month": 10, "total": 100 },
    { "month": 11, "total": 100 },
    { "month": 12, "total": 100 }
];
for (let i = 0 ; i < revenue.length ; i++){
    totalRevenue += revenue[i].total;
}
console.log(`Tong doanh thu la: ${totalRevenue}`);

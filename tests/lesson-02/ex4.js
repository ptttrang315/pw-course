const height = 120;

let remainder = height % 100;

let idHeight = remainder * 9 / 10;
let minHeight = remainder * 8 / 10;

if (height > 100) {
    console.log("Can nang ly tuong, toi thieu, toi da lan luot la ", idHeight, ", ", minHeight, ", ", remainder);
}
else {
     console.log("Cong thuc chi ap dung cho chieu cao > 100");

}

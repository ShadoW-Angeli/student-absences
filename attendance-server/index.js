const fs = require("fs");
fs.writeFileSync("noteTwo.txt", "something good \n litlle thing \n hot man");
const texts = fs.readFileSync("noteTwo.txt", "utf8");
console.log(texts);
fs.writeFileSync("textOne", "я хз");
const read = fs.readFileSync("textOne", "utf8");
console.log(read);
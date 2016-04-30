document.getElementById('hello').style.color = "red";
var fs = require('fs');

var rawText = fs.readfileSync('words.txt', 'utf8');

var wordArr = rawText.split('\n');

console.log(wordArr);

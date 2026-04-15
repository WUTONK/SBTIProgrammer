const fs = require('fs');
let content = fs.readFileSync('src/data/questions.js', 'utf8');
let optionCount = 0;
content = content.replace(/\{ text: ['"]([^'"]+)['"], score: ([^\}]+) \}(, \/\/ [A-C])?/g, (match, text, score, comment) => {
    let newText = '';
    if (optionCount % 3 === 0) newText = '认同';
    else if (optionCount % 3 === 1) newText = '有时候';
    else if (optionCount % 3 === 2) newText = '不认同';
    optionCount++;
    return `{ text: '${newText}', score: ${score} }${comment || ''}`;
});
fs.writeFileSync('src/data/questions.js', content, 'utf8');
console.log(`Modified ${optionCount} options in questions.js`);

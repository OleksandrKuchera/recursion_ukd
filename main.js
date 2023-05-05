const fs = require("fs");

function findLanguage(node, languageName) {
  if (node.Node.Language.Name.toLowerCase() === languageName.toLowerCase()) {
    return node.Node.Label;
  }else {
    for (let i = 0; i < node.Children.length; i++) {
      const childNode = node.Children[i];
      const result = findLanguage(childNode, languageName);
      if (result !== "") {
        return node.Node.Label + "." + result;
      }
    }
    return "";
  }
}

const tree = JSON.parse(fs.readFileSync("./language-tree.json"));

// знаходження мови за повною назвою
const fullName = "Sud Oranais-Gourara";
const result = findLanguage(tree, fullName);
console.log(`The way to language "${fullName}": ${result}`);

// знаходження мови за частковою назвою
const partialName = "Gourara";
let result2 = "";
for (let i = 0; i < tree.Children.length; i++) {
  const node = tree.Children[i];
  const result = findLanguage(node, partialName);
  if (result !== "") {
    result2 = result;
    break;
  }
}
if (result2 !== "") {
  console.log(`The path to the containing language "${partialName}": ${result2}`);
} else {
  console.log(`The language with the containing "${partialName}": was not found`);
}
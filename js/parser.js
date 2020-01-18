//https://github.com/bramp/js-sequence-diagrams/blob/master/README.md
class DiagramCreator {
  constructor(selector, path = "", theme = "simple") {
    this.selector = selector;
    this.parseData = this.parseData.bind(this);
    this.setTheme(theme);
    this.setPath(path);
  }
  fetchData() {
    document.querySelector("#" + this.selector).innerHTML = "Loading";
    fetch("samples/" + this.path)
      .then(res => res.text())
      .then(this.parseData);
  }
  setTheme(newTheme) {
    this.theme = newTheme;
    if (this.path) {
      this.fetchData();
    }
  }
  setPath(newPath) {
    this.path = newPath;
    this.fetchData();
  }
  parseData(data) {
    //let diagramData = [];
    let functions = [];
    let findAllFunctions = /function\s+([a-zA-Z]*)\((.*)\)\s*{/g;
    const matches = data.matchAll(findAllFunctions);

    //find function name, arguments & function body
    for (const match of matches) {
      //console.log(match);
      const restOfFile = data.substring(match.index);
      let openBrackets = 0;
      let functionAsString = "";
      const restOfFileAsArray = restOfFile.split("\n");
      for (let i = 0; i < restOfFileAsArray.length; i++) {
        let line = restOfFileAsArray[i];
        if (line.includes("{")) {
          openBrackets++;
        }
        if (line.includes("}")) {
          openBrackets--;
        }

        if (openBrackets === 0) {
          functionAsString = restOfFileAsArray.slice(0, i).join("\n");
          break;
        }
      }
      const func = {
        name: match[1],
        arguments: match[2].split(","),
        functionDefinition: functionAsString,
        calls: []
      };
      functions.push(func);
    }
    this.show(functions);
  }
  show(functions) {
    const functionNames = functions.map(func => func.name);

    //With all functions found (hopefully), find function calls within each function
    functions.forEach(func => {
      functionNames.forEach(fn => {
        if (fn != func.name) {
          //recursion is not an option here!
          if (func.functionDefinition.includes(fn)) {
            func.calls.push(fn);
          }
        }
      });
    });
    //console.log("functions:", functions);

    let diagramData = [];
    functions.forEach(func => {
      if (func.calls.length === 0) {
        diagramData.push(`participant ${func.name}`);
      } else {
        func.calls.forEach(call => {
          diagramData.push(
            `${func.name}->${call}: ${func.arguments.join(", ")}`
          );
        });
      }
    });
    document.querySelector("#" + this.selector).innerHTML = "";
    var diagram = Diagram.parse(diagramData.join("\n"));
    diagram.drawSVG(this.selector, { theme: this.theme }); //hand, simple
  }
}

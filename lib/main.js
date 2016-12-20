DOMNodeCollection = require("./dom_node_collection");

let readyCallbacks =[];
let docReady = false;

window.$l = (arg) => {
  switch(typeof(arg)) {
    case "function":
      return docReadyFunctions(arg);
    case "string":
      return new DOMNodeCollection(document.querySelectorAll(arg));
    case "object":
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
  }
};

$l.ajax = options => {

};




docReadyFunctions = (func) => {
  if (docReady) {
    func();
  } else {
    readyCallbacks.push(func);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  docReady = true;
  docReadyFunction.forEach( func => func() );
});

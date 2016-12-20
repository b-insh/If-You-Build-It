DOMNodeCollection = require("./dom_node_collection");

window.$l = (arg) => {
  switch(typeof(arg)) {
    case "function":
      return registerDocReadyCallback(arg);
    case "string":
      return new DOMNodeCollection(document.querySelectorAll(arg));
    case "object":
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
  }
};

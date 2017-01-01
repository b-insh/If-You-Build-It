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

$l.extend = (base, ...objects) => {
  return Object.assign(base, ...objects);
};

$l.ajax = options => {

  return new Promise(function(success, error) {
    const xhr = new XMLHttpRequest();
    const defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: "GET",
      url: "",
      success: () => {},
      error: () => {},
      data: {}
    };

    options = $l.extend(defaults, options);
    xhr.open(options.method, options.url );
    xhr.onload = () => {
      if (xhr.status === 200) {
        success(xhr.response);
      } else {
        error(Error(xhr.statusText));
      }
    };
    xhr.send(JSON.stringify(options.data));
  });
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
  readyCallbacks.forEach( func => func() );
});

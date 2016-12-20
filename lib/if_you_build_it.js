/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(HTMLElements) {
	    this.HTMLElements = HTMLElements;
	  }

	  html(selector) {
	    if(selector === undefined) {
	      return this.HTMLElements[0].innerHTML;
	    } else {
	      this.HTMLElements.forEach((el) => {
	        el.innerHTML = selector;
	      });
	    }
	  }

	  empty() {
	    this.html('');
	  }

	  append(children) {
	    if (typeof children === "object" && !(children instanceof DOMNodeCollection)) {
	      children = $l(children);
	    }
	    if (typeof children == "string") {
	      this.HTMLElements.forEach(node => node.innerHTML += children);
	    } else if (children instanceof DOMNodeCollection) {
	      this.HTMLElements.forEach(node => {
	        children.HTMLElements.forEach(childNode => {
	          node.appendChild(childNode.cloneNode(true));
	        });
	      });
	    }
	  }

	  attr(key, val) {
	    if (typeof val === "string") {
	      this.HTMLElements.forEach(node => node.setAttribute(key, val));
	    } else {
	      return this.HTMLElements[0].getAttribute(key);
	    }
	  }

	  addClass(selector) {
	    const selectors = selector.split(" ");
	    this.HTMLElements.forEach(el => {
	      selectors.forEach(selector => {
	        el.classList.add(selector);
	      });
	    });
	  }

	  removeClass(selector) {
	    const selectors = selector.split(" ");
	    this.HTMLElements.forEach(el => {
	      selectors.forEach(selector => {
	        el.classList.remove(selector);
	      });
	    });
	  }

	  children() {
	    let elements = [];
	    this.HTMLElements.forEach((el) => {
	      const children = el.children;
	      for(var i = 0; i < children.length; i++) {
	        elements.push(children[i]);
	      }
	    });
	    return new DOMNodeCollection(elements);
	  }

	  parent() {
	    let parents = [];
	    this.HTMLElements.forEach((el) => {
	      parents.push(el.parentNode);
	    });
	    return new DOMNodeCollection(parents);
	  }

	  find(selector) {
	    let nodes = [];
	    this.HTMLElements.forEach((el) => {
	      let foundNodes = el.querySelectorAll(selector);
	      nodes = nodes.concat(Array.from(foundNodes));
	    });
	    return new DOMNodeCollection(nodes);
	  }

	  remove() {
	    this.each(el => el.parentNode.removeChild(el));
	  }

	  on(action, callback) {
	    this.HTMLElements.forEach((el) => {
	      el.addEventListener(action, callback);
	      const eventAction = `${action}`;
	      if (typeof el[eventAction] === undefined) {
	        el[eventAction] = [];
	      }
	      el[eventAction].push(callback);
	    });
	  }

	  off(action) {
	    this.HTMLElements.forEach((el) => {
	      const eventAction = `${action}`;
	      if (el[eventAction]) {
	        el[eventAction].forEach(callback => {
	          el.removeEventListener(action, callback);
	        });
	      }
	      el[eventAction] = [];
	    });
	  }

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(HTMLElements) {
	    this.HTMLElements = HTMLElements;
	  }

	  // When used to return content, it returns the content of the FIRST matched element.
	  // When used to set content, it overwrites the content of ALL matched elements.
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

	  // When used to set attribute values, it sets one or more attribute/value pairs for the set of matched elements.
	  // When used to return the attribute value, it returns the value of the FIRST matched element.
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
	      let children = el.children;
	      for(var i = 0; i < children.length; i++) {
	        elements.push(children[i]);
	      }
	    });
	    return new DOMNodeCollection(elements);
	  }

	  parent() {
	    let parents = [];
	    this.HTMLElements.forEach((el) => {
	      let parent = el.parentNode;
	      parents.push(parent);
	    });
	    return new DOMNodeCollection(parents);
	  }

	  find(selector) {
	    let nodes = [];
	    this.HTMLElements.forEach((el) => {
	      let findNodes = el.querySelectorAll(selector);
	      for(var i = 0; i < findNodes.length; i++) {
	        nodes.push(findNodes[0]);
	      }
	    });
	    return new DOMNodeCollection(nodes);
	  }

	  remove() {
	    const initial = this.HTMLElements.length;
	    for(let i = 0; i < initial; i++) {
	      this.HTMLElements.shift(1).remove();
	    }

	  }

	  on(action, callback) {
	    this.HTMLElements.forEach((el) => {
	      el.addEventListener(action, callback);
	    });
	  }

	  off(action, callback) {
	    this.HTMLElements.forEach((el) => {
	      el.removeEventListener(action, callback);
	    });
	  }

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
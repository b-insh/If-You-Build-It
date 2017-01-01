class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  html(content) {
    if(content === undefined) {
      return this.HTMLElements[0].innerHTML;
    } else {
      this.HTMLElements.forEach((el) => {
        el.innerHTML = content;
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

  attr(className, val) {
    if (typeof val === "string") {
      this.HTMLElements.forEach(node => node.setAttribute(className, val));
    } else {
      return this.HTMLElements[0].getAttribute(className);
    }
  }

  addClass(className) {
    const classNames = className.split(" ");
    this.HTMLElements.forEach(el => {
      classNames.forEach(className => {
        el.classList.add(className);
      });
    });
  }

  removeClass(className) {
    const classNames = className.split(" ");
    this.HTMLElements.forEach(el => {
      classNames.forEach(className => {
        el.classList.remove(className);
      });
    });
  }

  children() {
    let elements = [];
    this.HTMLElements.forEach(el => {
      const children = el.children;
      for(var i = 0; i < children.length; i++) {
        elements.push(children[i]);
      }
    });
    return new DOMNodeCollection(elements);
  }

  parent() {
    let parents = [];
    this.HTMLElements.forEach(el => {
      parents.push(el.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let nodes = [];
    this.HTMLElements.forEach(el => {
      let foundNodes = el.querySelectorAll(selector);
      nodes = nodes.concat(Array.from(foundNodes));
    });
    return new DOMNodeCollection(nodes);
  }

  remove() {
    this.HTMLElements.forEach(el => el.parentNode.removeChild(el));
  }

  on(action, callback) {
    this.HTMLElements.forEach(el => {
      el.addEventListener(action, callback);
      const eventAction = `${action}`;
      if (typeof el[eventAction] === undefined) {
        el[eventAction] = [];
      }
      el[eventAction].push(callback);
    });
  }

  off(action) {
    this.HTMLElements.forEach(el => {
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

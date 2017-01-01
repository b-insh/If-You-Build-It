# If You Build It

If You Build It is a tool that works across browsers to handle AJAX requests, place and remove event listeners, and manipulate the DOM.

## Getting Started

There are two ways to take advantage of If You Build It's functionality in your own projects.

1. Download `dist/if_you_build_it.js` and include it in your program.
2. Download the `src` folder and use webpack to compile the files.

## API

- `html(content)`: Replaces the inner HTML of the element with content. If no arguments are given, it will return the inner HTML of the element.
- `empty()`: Clears the inner HTML of the element.
- `append(children)`: Will add the children to the end of the element. The children can be an HTML element, a string or another collection of DOM nodes.
- `attr(className, val)`: If both arguments are given, an HTML class with the given value will be set on the element. If only the first argument is given, the value of the given className will be returned if it exists.
- `addClass(className)` and `removeClass(className)`: Adds or removes classes from an element. Multiple classes may be added or removed at once.
- `children()`: Returns an array of all children of the element.
- `parent()`: Returns the parent of the element.
- `find(selector)`: The selector is the name of a class. Returns an array of all elements that contain the given selector.
- `remove()`: Removes all children from the element.
-  `on(action, callback)`: Sets an event listener on the element that will run the given callback function when triggered.
- `off(action)`: Removes the event listener from the element.

## Features

If You Build It allows for extensive DOM access and manipulation. For example, users can add and remove multiple class attributes at a time to alter their page with greater ease than individual selection or single class name changes.

```js
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
```
Additionally, If You Build It is able to successfully complete commands with arguments of different types. If a user wishes to `.append(children)` to certain nodes, they are able to pass in the children as an HTML Element, a string, or as a DOMNodeCollection and will receive back their intended result.

```js
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
```

If You Build It allows the user to place and remove event listeners on node elements. This is accomplished by storing the callback function inside the node object on placement and retrieving it when `.off()` is called.

```js
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
```

If You Build It returns promises from its ajax calls. Success and error callbacks can be chained onto the original call with `.then()` allowing for greater flexibility when making requests.
```js
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
```

# If You Build It

If You Build It is a tool that works across browsers to handle AJAX requests, place and remove event listeners, and manipulate the DOM.

If You Build it returns promises from its ajax calls. Success and error callbacks can be chained onto the original call with `.then()` allowing for greater flexibility when making requests.
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

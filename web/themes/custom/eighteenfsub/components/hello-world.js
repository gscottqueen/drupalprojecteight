// Import not needed because React & ReactDOM are loaded by *.libraries.yml
// import React from 'react';
// import ReactDOM from 'react-dom';

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <p>It is {new Date().toLocaleTimeString()}.</p>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById("hello-world")
  );
}

setInterval(tick, 1000);

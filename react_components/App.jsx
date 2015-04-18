/** @jsx React.DOM */

var React = require('react'),
    NavBar = require('./core/NavBar.react'),
    MainContent = require('./core/MainContent.react');

React.render(
  <div>
    <NavBar />
    <MainContent />,
  </div>,
  document.body
);

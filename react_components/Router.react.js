var React = require('react');
var page = require('page');

var HomePage = require('./pages/Homepage.react');
var DebugPage = require('./pages/DebugPage.react');
var AboutPage = require('./pages/AboutPage.react');
var ContactPage = require('./pages/ContactPage.react');
var PageNotFound = require('./pages/PageNotFound.react');

var Router = React.createClass({
  getInitialState: function() {
    return {
      component: <div/>
    };
  },
  componentDidMount: function() {
    
    page('/', function (ctx) {
      this.setState({component: <HomePage />});
    }.bind(this));

    page('/about', function (ctx) {
      this.setState({component: <AboutPage />});
    }.bind(this));

    page('/contact', function (ctx) {
      this.setState({component: <ContactPage />});
    }.bind(this));

    /*
    // Component then may cantain route variables via this.props.params.*
    page('/users/:id', function (ctx) {
      this.setState({component: <Page2 params={ctx.params} />});
    }.bind(this));
    */

    page('*', function (ctx) {
      this.setState({component: <PageNotFound />});
    }.bind(this));

    page.start();
  },
  render: function() {
    return this.state.component;
  }
});

module.exports = Router;

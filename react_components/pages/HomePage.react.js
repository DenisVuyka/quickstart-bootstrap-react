var React = require('react'),
    WelcomeBanner = require('../core/WelcomeBanner.react'),
    ExampleModal = require('../core/ExampleModal.react');

var HomePage = React.createClass({
  render: function() {
    var buttons = [
      { type: 'danger', text: 'Cancel', handler: this.handleCancel },
      { type: 'primary', text: 'OK', handler: this.handleOK }
    ];
    return (
      <div>
        <WelcomeBanner/>
        <h1>Home Page</h1>
        <button type="button" className="btn btn-default" onClick={this.showModal}>Show Modal</button>
        <ExampleModal ref="modal"
          show={false}
          header="Example Modal"
          buttons={buttons}>
          <p>Sample dialog content</p>
        </ExampleModal>
      </div>
    );
  },

  showModal: function() {
    this.refs.modal.show();
  },

  handleCancel: function() {
    this.refs.modal.hide();
  },

  handleOK: function() {
    this.refs.modal.hide();
  }
});

module.exports = HomePage;

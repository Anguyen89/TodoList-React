var React = require('react');


module.exports = React.createClass({

  render: function(){
    return (
      <div>
        <p>{this.props.title}</p>
        <p>{this.props.body}</p>
      </div>
    );
  }
});

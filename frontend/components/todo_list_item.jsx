var React = require('react');
var TodoStore = require('../stores/todo_store');

module.exports = React.createClass({

  handleDestroy: function(event){
    event.preventDefault();
    TodoStore.destroy(this.props.id);
  },

  render: function(){
    return (
      <div>
        <p>{this.props.title}<br/>{this.props.body}</p>
        <input type="button" onClick={this.handleDestroy} value="Delete" />
      </div>
    );
  }
});

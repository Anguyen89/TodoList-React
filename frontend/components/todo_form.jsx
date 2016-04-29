var React = require('react');
var TodoList = require('./todo_list');
var TodoStore = require('../stores/todo_store');

module.exports = React.createClass({

  getInitialState: function(){
    return {title: "", body: ""};
  },

  updateTitle: function(event){
    this.setState({title: event.currentTarget.value});
  },

  updateBody: function(event){
    this.setState({body: event.currentTarget.value});
  },

  handleSubmit: function(event){
    event.preventDefault();
    TodoStore.create(this.state);
    this.resetState();

  },

  resetState: function(){
    this.setState({title: "", body: ""});
  },

  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title
          <input type="text" onChange={this.updateTitle} value={this.state.title} />
        </label>
        <br />
        <label>
          Body
          <input type="text" onChange={this.updateBody} value={this.state.body} />
        </label>
        <input type="submit" value="Create New Todo Item" />
      </form>
    );
  }
});

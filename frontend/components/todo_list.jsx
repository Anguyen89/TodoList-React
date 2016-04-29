var React = require('react');
var TodoStore = require('../stores/todo_store');

module.exports = React.createClass({

  getInitialState: function(){
    return {todos: []};
  },

  todosChanged: function(){
    this.setState({todos: TodoStore.all()});
  },

  componentDidMount: function(){
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function(){
    TodoStore.removedChangedHandler(this.todosChanged);
  },

  render: function(){
    var todoList = this.state.todos.map(function(todo, idx){
      return <li id={todo.id}>{todo.title}</li>;
    });
    return (
      <div>
        <ul>
          {todoList}
        </ul>
      </div>
    );
  }

});

var React = require('react');
var TodoStore = require('../stores/todo_store');
var TodoListItem = require('./todo_list_item');
var TodoForm = require('./todo_form');

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
      return <TodoListItem id={todo.id} title={todo.title} body={todo.body} done={todo.done}/>;
    });
    return (
      <div>
          <ul>
            {todoList}
          </ul>
          <TodoForm />
      </div>
    );
  }

});

var _todos = [];
var _callbacks = [];

var TodoStore = {

  changed: function(){
    for (var i = 0; i < _callbacks.length; i++){
      _callbacks[i]();
    }
  },

  addChangedHandler: function(cb){
    _callbacks.push(cb);
  },

  removedChangedHandler: function(cb){
    _callbacks = _callbacks.map(function(callback){
      return cb !== callback;
    });
  },

  all: function(){
    return _todos;
  },

  fetch: function(){
    var self = this;
    $.ajax({
      url: '/api/todos',
      method: 'GET',
      success: function(data){
        _todos = data;
        self.changed();
      }
    });
  },

  create: function(todo){
    var self = this;

    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: {todo: todo},
      success: function(data){
        console.log("Todo Created");
        _todos.push(data);
        self.changed();
      }
    });
  },

  destroy: function(id){
    var self = this;
    var exists = false;

    for (var i = 0; i < _todos.length; i++){
      if (_todos[i].id === id){
        exists = true;
        break;
      }
    }

    if (exists){
      $.ajax({
        url: '/api/todos/'+ id.toString(),
        method: 'DELETE',
        success: function(data){
          console.log(data);
          _todos = _todos.filter(function(el){
            return el.id !== id;
          });
          self.changed();
        }
      });
    }
  },

  toggleDone: function(id){
    var self = this;
    var todoItem;
    for(var i = 0; i < _todos.length; i++){
      if (_todos[i].id === id){
        todoItem = _todos[i];
        _todos[i].done = !(_todos[i].done);
      }
    }
    $.ajax({
      url: '/api/todos/' + id.toString(),
      method: 'PATCH',
      data: {todo: todoItem},
      success: function(data){
        self.changed();
      }
    });
  }

};


module.exports = TodoStore;

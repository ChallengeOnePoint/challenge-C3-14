var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(9002);

var todos = [];

app.use(bodyParser.urlencoded());

app.get('/api/todo', function(req, res) {
  return res.json(todos);
});

app.post('/api/todo', function(req, res) {
  var newTodo = {
    title: req.body.title,
    contents: req.body.contents
  };
  var id = todos.push(newTodo) - 1;
  newTodo.id = id;
  io.sockets.emit('new', newTodo);
  return res.json(newTodo);
});

app.post('/api/todo/:id', function(req, res) {
  var todo = todos[req.params.id];
  todo.title = req.body.title;
  todo.contents = req.body.contents;
  io.sockets.emit('change', {
    id: req.params.id,
    title: req.body.title,
    contents: req.body.contents
  });
  return res.json(todo);
});

app.post('/api/todo/:id/delete', function(req, res) {
  todos[req.params.id] = null;
  io.sockets.emit('delete', { id: req.params.id });
  return res.status(200).end();
});

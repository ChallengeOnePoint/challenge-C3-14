let store = Redux.createStore(function(state = { todos: Immutable.List() }, action) {
  if (action.type === "NEW")
    return { todos: state.todos.push(action.payload) };
  else if (action.type === "CHANGE")
    return { todos: state.todos.update(action.payload.id, action.payload) };
  else if (action.type === "DELETE")
    return { todos: state.todos.delete(action.payload.id) };
  else
    return state;
});

store.dispatch({ type: "INIT" });


class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col s12 m4 l4">
        <div className="card medium hoverable">
          <div className="card-content">
          <span className="card-title grey-text">{this.props.title}</span>
          <p className="grey-text">Thanks </p>
          </div>
          <div className="card-action">
          <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    );
  }
}

class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: []
    };
  }

  AddCard() {
    fetch("http://cmc.im:9005/api/todo", { method: "POST"})
      .then(function(data){
          console.log(data);
      }).catch(function(err){
          console.log(err);
      });
  }

  componentWillMount() {
    this.socket = io('http://cmc.im:9005');
    this.socket.on('new', function(todo) {
      this.state.todo.push(todo);
      this.setState({ todo: this.state.todo.slice() });
    });
  }

  componentDidMount() {
    fetch("http://cmc.im:9005/api/todo")
      .then((data) => this.setState({ todo: data }))
      .catch(function(err){
          console.log(err);
      });
  }

  render() {
    console.log(this.state.todo);
    var cards = this.state.todo.map(function(elem) {
      return <Card key={elem.id} title={elem.title} contents={elem.contents} />;
    });
    return (
          <div>
          <div className="navbar-fixed">
    <nav className="blue" role="navigation">
      <div className="nav-wrapper container">
          <div className="brand-logo" style={{"verticalAlign": "middle"}}> Trellow </div>
      </div>
    </nav>

  </div>
    <div className="container">
    <div className="section">
        <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.AddCard.bind(this)}>
            <i className="material-icons">add</i>
         </a>
      <div className="row">
         {cards}
         
      </div>
    </div>
    </div>
    <div className="divider"></div>
        <footer className="page-footer fixed blue lighten-1">
            <div className="container">
            <div className="row">
                <div className="col l6 s12" align="center">
                </div>
            </div>
            </div>
        </footer>
    </div>);
  }
}

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Homepage />
  </ReactRedux.Provider>,
  document.getElementById('example')
);

let store = Redux.createStore(function(state = Immutable.List(), action) {
  if (action.type === "NEW")
    return state.push(action.payload);
});

@ReactRedux.connect(state => state)
class Card extends React.Component {
  constructor() {
    this.state = {};// TODO
  }
  render() {
    return (
      <div className="col s12 m4 l4">
        <div className="card medium hoverable">
          <div className="card-content">
          <span className="card-title grey-text">item1</span>
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
  render() {
    return (
          <div>
          <div className="navbar-fixed">
    <nav className="blue" role="navigation">
      <div className="nav-wrapper container">
          <div className="brand-logo" style={{"verticalAlign": "middle"}}> Catstagram </div>
      </div>
    </nav>

  </div>
    <div className="container">
    <div className="section">
      <div className="row">
         <div className="col s12 m4 l4">
          <div className="card medium hoverable">
            <div className="card-content">
              <span className="card-title grey-text">item1</span>
              <p className="grey-text">Thanks </p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
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

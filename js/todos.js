let store = Redux.createStore(function(state = Immutable.List(), action) {
  if (action.type === "NEW")
    return state.push(action.payload);
});

class Card extends React.Component {
  constructor(props) {
    super(props);
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
ReactRedux.connect(state => state)(Card);
  
class Homepage extends React.Component {
    
    AddCard() {
      fetch("http://cmc.im:9005/api/todo", { method: "POST"})
      .then(function(data){
          console.log(data);
      }).catch(function(err){
          console.log(err);
      });
    }
    
  render() {
      var cards = [];
      for (var i = 0; i < 20; i++)
        cards.push(<Card key={i} />);
        
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

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Clock from './Clock/Clock';
import CardList from './GithubProfile/CardList';
import AddCard from './GithubProfile/AddCard';
import GithubUserDetails from './GithubProfile/GithubUserDetails';
import './App.css';

function Header() {
  return (
    <header className="App-header">
      <h1>Welcome To My First React App</h1>
      <Clock />
    </header>
  )
}

function Footer() {
  return (
    <footer className="App-footer">
      <small>Developed By Odinaka Joy</small>
    </footer>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    }
  }
  
  addCard = (cardData) => {
    this.setState(prevState => ({
      cards: [...prevState.cards, cardData]
    }))
  }

  componentDidMount() {
    let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;
    while ( i-- ) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
      this.setState({ cards: values });
    }
  }

  componentWillUnmount() {
    this.setState({ cards: this.state});
  }

  render() {
    return (
      <Router>
        <>
          <Header />
          <main>
            <Route exact path="/" render= {props=> (
              <React.Fragment>
                <div className="add-card-wrapper">
                  <AddCard onSubmit={this.addCard} />
                </div>
                <div className="content">
                  <CardList cards={this.state.cards} />
                </div>
              </React.Fragment>
            )} />
            <Route path="/users/:id" component={GithubUserDetails} />
          </main>
          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
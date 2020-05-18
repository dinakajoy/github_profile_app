import React from 'react';
import { Link } from 'react-router-dom'; 
import './GithubProfile.css';

class CardItem extends React.Component {
  render() {
    return (
      <Link to={{ pathname:/users/+this.props.card.login, card: "hey" }} target="_BLANK" rel="noopener noreferrer" className="link">
        <div className="wrapper">
          <img src={this.props.card.avatar_url} alt={this.props.card.name} />
          <div className="details">
            <h2>{this.props.card.name}</h2><br />
            <p>{this.props.card.location}</p>
            <p>{this.props.card.url}</p>
          </div>
        </div> 
      </Link>
    );
  }
}

export default CardItem;
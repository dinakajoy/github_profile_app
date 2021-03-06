import React from 'react';
import { Link } from 'react-router-dom'; 
import './GithubProfile.css';

class CardItem extends React.Component {
  user = () => <i class="fa fa-user-circle-o" style="font-size:48px;color:red"></i>;

  getDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `Joined ${monthNames[new Date(date).getMonth()]} ${new Date(date).getDay()}, ${new Date(date).getFullYear()}`;
  };

  render() {
    return (
      <Link to={{ pathname:/users/+this.props.card.login, card: "hey" }} target="_BLANK" rel="noopener noreferrer" className="link">
        <div className="card-wrapper">
          <div className="card-img">
            <img src={this.props.card.avatar_url === null ? this.user : this.props.card.avatar_url} alt={this.props.card.name} />
          </div>
          <div className="card-details">
            <h2>{this.props.card.name}</h2>
            <p><span><i className="fa fa-map-marker"></i></span> <span>{this.props.card.location === null ? 'Not Applicable': this.props.card.location}</span></p>
            <p><span><i className="fa fa-calendar"></i></span> <span>{this.getDate(this.props.card.created_at)}</span></p>
             <p><span><i class="fa fa-twitter"></i></span> <span>{this.props.card.twitter_username === null ? 'Not Applicable': this.props.card.twitter_username}</span></p>
          </div>    
        </div>     
      </Link>
    );
  }
}

export default CardItem;
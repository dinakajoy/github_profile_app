import React from 'react';
import CardItem from './CardItem';
import './GithubProfile.css';

class CardList extends React.Component {
  render() {
    return (
      this.props.cards.map((card) => <CardItem key={card.id} card={card} />)
    );
  }
}

export default CardList;
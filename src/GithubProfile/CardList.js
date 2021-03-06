import React from 'react';
import CardItem from './CardItem';
import './GithubProfile.css';

class CardList extends React.Component {
  render() {
    return (
      <section className="container">
          <div className="cards-wrapper">
            { this.props.cards.map((card) => <CardItem key={card.id} card={card} /> ) }
        </div>
      </section>
    );
  }
}

export default CardList;
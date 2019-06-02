import React from 'react';
import styles from './Column.scss';
import Card from '../Card/Card';
import Creator from '../Creator/Creator';
import PropTypes from 'prop-types';
import {settings} from '../../data/dataStore';

class Column extends React.Component {

  state = {
    cards: this.props.cards || [],
  }

  render() {
    console.log('Cards:', this.state.cards);
    return (
      <section className={styles.component}>

        <h3 className={styles.title}>{this.props.title}</h3>

        <div>
          {this.state.cards.map(({key, ...cardProps}) => (
            <Card key={key} {...cardProps} />
          ))}
        </div>

        <div className={styles.creator}>
          <Creator text={settings.cardCreatorText} action={title => this.addCard(title)}/>
        </div>

      </section>
    )
  }

  addCard(title){
    this.setState(state => (
      {
        cards: [
          ...state.cards,
          {
            key: state.cards[state.cards.length-1].key+1,
            title
          }
        ]
      }
    ));
  }

  static propTypes = {
    title: PropTypes.string,
    cards: PropTypes.array,
  }
}

export default Column;

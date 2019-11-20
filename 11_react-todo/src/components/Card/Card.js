import React from 'react';
import styles from './Card.scss';
import PropTypes from 'prop-types';

class Card extends React.Component {

  render() {
    const {title} = this.props;

    return (
      <section className={styles.component}>
        <h3>{title}</h3>
      </section>
    );
  }

  static propTypes = {
    title: PropTypes.string,
  }
}

export default Card;

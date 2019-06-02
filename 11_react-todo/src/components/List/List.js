import React from 'react';
import styles from './List.scss';
import Hero from '../Hero/Hero';
import Column from '../Column/Column'
import Creator from '../Creator/Creator'
import PropTypes from 'prop-types';
import {settings} from '../../data/dataStore';
import ReactHtmlParser from 'react-html-parser';

class List extends React.Component {

  state = {
    columns: this.props.columns || [],
  }

  render() {
    console.log('Columns:', this.state.columns);
    return (

      <section className={styles.component}>

        <Hero titleText={this.props.title} bgImage={this.props.image} />

        <div className={styles.description}>
          {ReactHtmlParser(this.props.description)}
        </div>

        <div className={styles.columns}>
          {this.state.columns.map(({key, ...columnProps}) => (
            <Column key={key} {...columnProps} />
          ))}
        </div>

        <div className={styles.creator}>
          <Creator text={settings.columnCreatorText} action={title => this.addColumn(title)}/>
        </div>

      </section>
    )
  }

  addColumn(title){
  this.setState(state => (
    {
      columns: [
        ...state.columns,
        {
          key: state.columns[state.columns.length-1].key+1,
          title,
          icon: 'list-alt',
          cards: []
        }
      ]
    }
  ));
}

  static propTypes = {
    title: PropTypes.node.isRequired,
    image: PropTypes.string,
    description: PropTypes.node,
    columns: PropTypes.array,
  }

  static defaultProps = {
    description: settings.defaultListDescription,
  }
}

export default List;

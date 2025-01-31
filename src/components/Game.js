import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recentSubmission: '',
      allSubmissions: [],
      showPoem: false,
    }
  }

  addLine = (newLine) => {
    const makeSentence = `The ${newLine.adjective} ${newLine.noun} ${newLine.adverb} ${newLine.verb} the ${newLine.adjective2} ${newLine.noun2}.`

    this.state.allSubmissions.push(makeSentence);

    this.setState({
      recentSubmission: makeSentence,
      allSubmissions: this.state.allSubmissions,
    })

    console.log(this.state.allSubmissions)
  }

 onClickShowPoem = () => {
    this.setState({
      showPoem: true,
    });
  }

  render() {
    const showPoem = this.state.showPoem;

    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    return (

      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">
          { exampleFormat }
        </p>

        { (this.state.allSubmissions.length > 0 && !showPoem) ? <RecentSubmission newLine={this.state.recentSubmission}/> : ''}

        { (!showPoem ? <PlayerSubmissionForm addLineCallback={this.addLine}/> : '') }

        <FinalPoem allLines={this.state.allSubmissions} showPoem={this.state.showPoem} onClickShowPoemCallback={this.onClickShowPoem}/>
      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

Game.propTypes = {
  newLine: PropTypes.object.isRequired,
}

export default Game;

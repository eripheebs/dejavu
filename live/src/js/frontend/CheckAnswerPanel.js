import React, { Component } from 'react';

class CheckAnswerPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        open: false,
        answer: null,
        keywords: [],
        wordCount: null,
        percentageMatch: null,
        displayAnswer: false
    }
  }

  showPanel = () => {
    this.setState({ open: !this.state.open })
  }

  valChangeAnswer = (event) => {
    this.setState({ answer: event.target.value,
      displayAnswer: false });
  }

  handleKeywordInput = (keywordInput) => {
    var keywords = keywordInput.target.value;
    var keywordArray = this.parse(keywords);
    this.setState({ keywords: keywordArray,
      displayAnswer: false });
  }

  parse = (keywords) => {
    return keywords.split(/[\n;]/);
  }

  checkAnswer = () => {
    var percentageMatch = this.getPercentageMarch();
    var wordCount = this.getWordCount();
    this.setState({ displayAnswer: true,
        percentageMatch: percentageMatch,
        wordCount: wordCount });
  }

  getPercentageMarch = () => {
    var matchedArray = [];
    this.state.keywords.forEach((keyword) => {
      if (this.state.answer.includes(keyword)) {
        matchedArray.push(keyword);
      }
    });
    return (matchedArray.length/this.state.keywords.length * 100).toFixed(2) + "%";
  }

  getWordCount = () => {
      return this.state.answer.split(' ').length;
  }

  render() {
    return (
        <div className="check-answer">
            <a className="btn btn-default submit-btn" onClick={this.showPanel}>
                { this.state.open ? "Close Quick Check" : "Quick Check Answer" }
            </a>
            {
                this.state.open ?
                <div className="check-answer-panel">
                    <textarea className="form-control" name="answer" placeholder="Insert answer here"
                                            onChange={this.valChangeAnswer} />
                    <textarea className="form-control" name="keywords" placeholder="Insert keywords here, newline OR semicolon in between words"
                                            onChange={this.handleKeywordInput} />
                    <a className="btn btn-default submit-btn" onClick={this.checkAnswer}>
                        Check Answer
                    </a>
                    { this.state.displayAnswer && !!this.state.answer ?
                        <div className="answer-analysis">
                            <p>Percentage match keywords: { this.state.percentageMatch ? this.state.percentageMatch : null }</p>
                            <p>Word count: { this.state.wordCount ? this.state.wordCount : null }</p>
                        </div> :
                        <div></div>
                    }
                </div> :
                <div></div>
            }
        </div>
    );
  }
}

module.exports = CheckAnswerPanel;
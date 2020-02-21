import React from 'react';

type SentenceCardProps = {
  sentence: string;
  checked: boolean;
}

class SentenceCard extends React.Component<SentenceCardProps, {}> {
  render() {
    return (
      <div className={`sentence-card ${this.props.checked ? 'checked' : ''}`}>
        <p>{this.props.sentence}</p>
        <div className="side"></div>
      </div>
    )
  }
}

export default SentenceCard;

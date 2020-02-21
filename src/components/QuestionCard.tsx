import React from 'react';

type QuestionCardProps = {
  question: string;
  explanation: string;
}

class QuestionCard extends React.Component<QuestionCardProps, {}> {
  render() {
    return (
      <p className="explanation">
        <b><i>{this.props.question}</i></b><br />
        {this.props.explanation}
      </p>
    );
  }
}

export default QuestionCard;

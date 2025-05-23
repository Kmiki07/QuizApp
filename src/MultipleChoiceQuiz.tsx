import React from 'react';
import type { MultipleChoiceQuestion } from './quizData';

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean) => void;
}

const MultipleChoiceQuiz: React.FC<Props> = ({ question, onAnswer }) => {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [answered, setAnswered] = React.useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    onAnswer(idx === question.answer);
  };

  return (
    <div>
      <h3 style={{ fontSize: 26, marginBottom: 20 }}>{question.question}</h3>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: 720, margin: '0 auto' }}>
        {question.options.map((opt, idx) => {
          let btnClass = 'option-btn';
          if (answered) {
            if (idx === question.answer) {
              btnClass += ' correct';
            } else if (selected === idx && idx !== question.answer) {
              btnClass += ' incorrect';
            }
          } else if (selected === idx) {
            btnClass += ' selected';
          }
          return (
            <li key={idx} style={{ marginBottom: 0 }}>
              <button
                className={btnClass}
                onClick={() => handleSelect(idx)}
                disabled={answered}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <div>{selected === question.answer ? 'Correct!' : 'Incorrect.'}</div>
      )}
    </div>
  );
};

export default MultipleChoiceQuiz;

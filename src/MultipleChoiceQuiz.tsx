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
          let bg = '#f8f8f8';
          let fontWeight = selected === idx ? 600 : 400;
          let boxShadow = selected === idx ? '0 2px 8px #bbb' : undefined;
          if (answered) {
            if (idx === question.answer) {
              bg = 'lightgreen';
              fontWeight = 700;
            } else if (selected === idx && idx !== question.answer) {
              bg = 'salmon';
              fontWeight = 700;
            }
          } else if (selected === idx) {
            bg = '#e0e0e0';
          }
          return (
            <li key={idx} style={{ marginBottom: 12 }}>
              <button
                style={{
                  width: 700, // Even wider
                  minWidth: 700,
                  maxWidth: 700,
                  padding: '14px 18px',
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  textAlign: 'left',
                  fontSize: 18,
                  borderRadius: 8,
                  border: '1px solid #bbb',
                  background: bg,
                  fontWeight,
                  boxShadow,
                  transition: 'background 0.2s, box-shadow 0.2s',
                  cursor: answered ? 'default' : 'pointer',
                  outline: 'none',
                  display: 'block',
                  margin: '0 auto',
                }}
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

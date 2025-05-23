import React from 'react';
import type { FlashcardQuestion } from './quizData';

interface Props {
  question: FlashcardQuestion;
  onResult?: (knew: boolean) => void;
}

const cardStyle: React.CSSProperties = {
  display: 'inline-block',
  width: 600, // 2x original width
  height: 360, // 2x original height
  borderRadius: 8,
  background: 'none',
  cursor: 'pointer',
  perspective: 1000,
  position: 'relative',
};

const innerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  transition: 'transform 0.5s',
  transformStyle: 'preserve-3d',
  boxShadow: undefined, // Remove inline shadow, use CSS only
  borderRadius: 8,
};

const sideStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 22,
  backfaceVisibility: 'hidden',
  borderRadius: 8,
  overflow: 'auto', // Allow scrolling if content overflows
  padding: 24, // Add padding for better readability
  boxSizing: 'border-box',
};

const backStyle: React.CSSProperties = {
  ...sideStyle,
  transform: 'rotateY(180deg)',
};

const FlashcardQuiz: React.FC<Props> = ({ question, onResult }) => {
  const [flipped, setFlipped] = React.useState(false);
  const [answered, setAnswered] = React.useState<null | boolean>(null);
  const [hasFlipped, setHasFlipped] = React.useState(false);

  // Reset state when question changes
  React.useEffect(() => {
    setFlipped(false);
    setAnswered(null);
    setHasFlipped(false);
  }, [question]);

  const handleFlip = () => {
    if (!flipped) setHasFlipped(true);
    setFlipped((f) => !f);
  };

  const handleResult = (knew: boolean) => {
    if (answered !== null) return; // Prevent changing answer
    setAnswered(knew);
    if (onResult) onResult(knew);
  };

  return (
    <div style={{ margin: '2em 0', textAlign: 'center' }}>
      <div
        style={cardStyle}
        onClick={handleFlip}
        title="Click to flip"
      >
        <div
          style={{
            ...innerStyle,
            transform: flipped ? 'rotateY(180deg)' : 'none',
          }}
        >
          {/* Front Side */}
          <div className="flashcard-side" style={sideStyle}>
            {question.frontIsImage ? (
              <img src={question.front} alt="Flashcard front" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', width: '100%', height: '100%', display: 'block', margin: '0 auto' }} />
            ) : (
              <span>{question.front}</span>
            )}
          </div>
          {/* Back Side */}
          <div className="flashcard-side" style={backStyle}>
            {question.backIsImage ? (
              <img src={question.back} alt="Flashcard answer" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', width: '100%', height: '100%', display: 'block', margin: '0 auto' }} />
            ) : (
              <span>{question.back}</span>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 8, color: '#888' }}>
        (Click card to flip)
      </div>
      {/* Show answer buttons after first flip, but allow flipping anytime */}
      {hasFlipped && (
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => handleResult(true)}
            disabled={answered !== null}
            className={answered === true ? 'flashcard-btn knew on' : 'flashcard-btn knew'}
            style={{
              marginRight: 12,
              fontWeight: answered === true ? 700 : undefined,
            }}
          >
            I knew it
          </button>
          <button
            onClick={() => handleResult(false)}
            disabled={answered !== null}
            className={answered === false ? 'flashcard-btn didnt on' : 'flashcard-btn didnt'}
            style={{
              fontWeight: answered === false ? 700 : undefined,
            }}
          >
            I didn't know
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardQuiz;

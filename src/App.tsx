import { useState } from 'react'
import './App.css'
import { quizzes } from './quizData'
import MultipleChoiceQuiz from './MultipleChoiceQuiz'
import FlashcardQuiz from './FlashcardQuiz'

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null)
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0)
  const [inQuiz, setInQuiz] = useState(false)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [results, setResults] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([])
  const quizObj = selectedQuiz !== null ? quizzes[selectedQuiz] : null;
  const quiz = quizObj ? (shuffle ? shuffledQuestions[currentQuizIdx] : quizObj.questions[currentQuizIdx]) : null

  const handleNext = () => {
    if (!quizObj) return
    if (currentQuizIdx + 1 < quizObj.questions.length) {
      setCurrentQuizIdx((idx) => idx + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleAnswer = (correct: boolean) => {
    setResults((prev) => {
      const next = [...prev]
      next[currentQuizIdx] = correct ? 1 : 0
      return next
    })
    if (autoAdvance) {
      setTimeout(handleNext, 1000)
    }
  }

  const handleStartQuiz = (idx: number) => {
    setSelectedQuiz(idx)
    setCurrentQuizIdx(0)
    setInQuiz(true)
    setResults([])
    setShowResults(false)
    if (shuffle) {
      setShuffledQuestions(shuffleArray(quizzes[idx].questions))
    } else {
      setShuffledQuestions([])
    }
  }

  const handleBackToMenu = () => {
    setInQuiz(false)
    setSelectedQuiz(null)
    setCurrentQuizIdx(0)
    setResults([])
    setShowResults(false)
  }

  let correctCount = results.reduce((a, b) => a + b, 0)
  let totalCount = quizObj ? quizObj.questions.length : 0
  let percent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 12 }}>
      <h1
        style={{ cursor: 'pointer', userSelect: 'none', marginTop: 0, marginBottom: 18 }}
        onClick={handleBackToMenu}
        title="Go to menu"
      >
        Quiz App
      </h1>
      {!inQuiz ? (
        <nav style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 28,
            justifyContent: 'center',
            marginTop: 32,
          }}>
            {/* Shuffle Switch */}
            <div className="shuffle-switch">
              <label className="shuffle-switch-label">
                <input
                  type="checkbox"
                  checked={shuffle}
                  onChange={e => setShuffle(e.target.checked)}
                  className="shuffle-switch-checkbox"
                />
                <span className="switch-slider" />
                Shuffle questions
              </label>
            </div>
            {quizzes.map((q, idx) => (
              <div
                key={q.name}
                className={`menu-card${selectedQuiz === idx ? ' selected' : ''}`}
                onClick={() => handleStartQuiz(idx)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleStartQuiz(idx) }}
                title={`Start ${q.name} quiz`}
              >
                <div className="menu-card-title">{q.name}</div>
                <div className="menu-card-questions">
                  {q.questions.length} question{(q.questions.length !== 1) ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </nav>
      ) : quizObj && !showResults ? (
        <div>
          <div style={{
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}>
            {/* Progress */}
            <div className={`quiz-info-bar progress`}>
              {`Question ${currentQuizIdx + 1} / ${quizObj.questions.length}`}
            </div>
            {/* Score */}
            <div className={`quiz-info-bar score`}>
              {`Score: ${results.reduce((a, b) => a + b, 0)}`}
            </div>
            {/* Auto-advance toggle */}
            <button
              className={`quiz-info-bar auto-advance-btn ${autoAdvance ? 'on' : 'off'}`}
              onClick={() => setAutoAdvance((v) => !v)}
              type="button"
            >
              Auto-advance {autoAdvance ? 'ON' : 'OFF'}
            </button>
          </div>
          {/* Render the question/flashcard/options above the navigation buttons */}
          {quiz && quiz.type === 'multiple-choice' ? (
            <MultipleChoiceQuiz question={quiz} onAnswer={handleAnswer} />
          ) : quiz && quiz.type === 'flashcard' ? (
            <FlashcardQuiz question={quiz} onResult={handleAnswer} />
          ) : null}
          {/* Move navigation buttons back below everything in the quiz view */}
          <div style={{ marginTop: 24 }}>
            <button onClick={handleBackToMenu}>Back to Menu</button>
            {/* Show Next button only if answered, and autoAdvance is off */}
            {((quiz && quiz.type === 'multiple-choice' && results[currentQuizIdx] !== undefined && !autoAdvance) ||
              (quiz && quiz.type === 'flashcard' && results[currentQuizIdx] !== undefined && !autoAdvance)) && (
              <button onClick={handleNext} style={{ marginLeft: 12 }}>Next</button>
            )}
          </div>
        </div>
      ) : showResults && quizObj ? (
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="results-card">
            <h2 style={{ fontSize: 32, margin: '0 0 18px 0', color: '#388e3c', letterSpacing: 1 }}>Quiz Results</h2>
            <div style={{ fontSize: 22, margin: '18px 0', fontWeight: 600 }}>
              You got <span style={{ color: '#388e3c', fontWeight: 700 }}>{correctCount}</span> out of <span style={{ color: '#1976d2', fontWeight: 700 }}>{totalCount}</span> correct
            </div>
            <div style={{ fontSize: 32, margin: '12px 0 24px 0', color: percent >= 70 ? '#1976d2' : percent >= 40 ? '#1976d2' : '#d32f2f', fontWeight: 700 }}>
              <span style={{ fontWeight: 900 }}>{percent}%</span>
            </div>
            <button
              onClick={handleBackToMenu}
              className="back-to-menu-btn"
            >
              Back to Menu
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App

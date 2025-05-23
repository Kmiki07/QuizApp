import { useState } from 'react'
import './App.css'
import { subjects } from './quizData'
import MultipleChoiceQuiz from './MultipleChoiceQuiz'
import FlashcardQuiz from './FlashcardQuiz'

function App() {
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null)
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0)
  const [inQuiz, setInQuiz] = useState(false)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [results, setResults] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const subject = selectedSubject !== null ? subjects[selectedSubject] : null
  const quiz = subject ? subject.quizzes[currentQuizIdx] : null

  const handleNext = () => {
    if (!subject) return
    if (currentQuizIdx + 1 < subject.quizzes.length) {
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
    setSelectedSubject(idx)
    setCurrentQuizIdx(0)
    setInQuiz(true)
    setResults([])
    setShowResults(false)
  }

  const handleBackToMenu = () => {
    setInQuiz(false)
    setSelectedSubject(null)
    setCurrentQuizIdx(0)
    setResults([])
    setShowResults(false)
  }

  let correctCount = results.reduce((a, b) => a + b, 0)
  let totalCount = subject ? subject.quizzes.length : 0
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
            {subjects.map((s, idx) => (
              <div
                key={s.name}
                onClick={() => handleStartQuiz(idx)}
                style={{
                  cursor: 'pointer',
                  minWidth: 220,
                  maxWidth: 260,
                  flex: '1 1 220px',
                  background: '#f8fafd',
                  borderRadius: 18,
                  boxShadow: selectedSubject === idx ? '0 4px 18px #b3e5fc' : '0 2px 8px #e0e0e0',
                  border: selectedSubject === idx ? '2px solid #1976d2' : '2px solid #e0e0e0',
                  padding: '32px 24px 24px 24px',
                  margin: 0,
                  transition: 'box-shadow 0.2s, border 0.2s, background 0.2s',
                  textAlign: 'center',
                  position: 'relative',
                  userSelect: 'none',
                }}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleStartQuiz(idx) }}
                title={`Start ${s.name} quiz`}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = '#e3f2fd';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px #90caf9';
                  (e.currentTarget as HTMLDivElement).style.border = '2px solid #1976d2';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = '#f8fafd';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = selectedSubject === idx ? '0 4px 18px #b3e5fc' : '0 2px 8px #e0e0e0';
                  (e.currentTarget as HTMLDivElement).style.border = selectedSubject === idx ? '2px solid #1976d2' : '2px solid #e0e0e0';
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1976d2', marginBottom: 10, letterSpacing: 0.5 }}>{s.name}</div>
                <div style={{ fontSize: 16, color: '#555', marginBottom: 8 }}>
                  {s.quizzes.length} question{(s.quizzes.length !== 1) ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </nav>
      ) : subject && !showResults ? (
        <div>
          <div style={{
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}>
            {/* Progress */}
            <div style={{
              padding: '8px 20px',
              borderRadius: 20,
              background: '#f0f0f0',
              fontWeight: 600,
              fontSize: 18,
              boxShadow: '0 1px 4px #ddd',
              minWidth: 120,
              textAlign: 'center',
            }}>
              {`Question ${currentQuizIdx + 1} / ${subject.quizzes.length}`}
            </div>
            {/* Score */}
            <div style={{
              padding: '8px 20px',
              borderRadius: 20,
              background: '#f0f0f0',
              fontWeight: 600,
              fontSize: 18,
              boxShadow: '0 1px 4px #ddd',
              minWidth: 120,
              textAlign: 'center',
            }}>
              {`Score: ${results.reduce((a, b) => a + b, 0)}`}
            </div>
            {/* Auto-advance toggle */}
            <button
              onClick={() => setAutoAdvance((v) => !v)}
              style={{
                padding: '8px 20px',
                borderRadius: 20,
                background: autoAdvance ? '#c8e6c9' : '#ffcdd2',
                fontWeight: 600,
                fontSize: 18,
                boxShadow: '0 1px 4px #ddd',
                minWidth: 120,
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
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
            <button onClick={handleNext} style={{ marginLeft: 12 }}>Next</button>
          </div>
        </div>
      ) : showResults && subject ? (
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            background: '#f0f0f0',
            borderRadius: 24,
            boxShadow: '0 2px 12px #ddd',
            padding: '36px 48px',
            minWidth: 340,
            textAlign: 'center',
            marginBottom: 32,
            border: '2px solid #c8e6c9',
            maxWidth: 600,
          }}>
            <h2 style={{ fontSize: 32, margin: '0 0 18px 0', color: '#388e3c', letterSpacing: 1 }}>Quiz Results</h2>
            <div style={{ fontSize: 22, margin: '18px 0', fontWeight: 600 }}>
              You got <span style={{ color: '#388e3c' }}>{correctCount}</span> out of <span style={{ color: '#1976d2' }}>{totalCount}</span> correct
            </div>
            <div style={{ fontSize: 20, margin: '12px 0 24px 0', color: percent >= 70 ? '#388e3c' : percent >= 40 ? '#fbc02d' : '#d32f2f', fontWeight: 700 }}>
              {percent}%
            </div>
            <button
              onClick={handleBackToMenu}
              style={{
                marginTop: 12,
                padding: '12px 32px',
                borderRadius: 20,
                background: '#1976d2',
                color: '#fff',
                fontWeight: 600,
                fontSize: 18,
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 4px #bbb',
                transition: 'background 0.2s',
              }}
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

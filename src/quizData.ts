// Quiz data types and default data for the quiz app
import { nummod1Questions } from './nummod1Questions';
import { kriptovizsgaFlashcards } from './kriptovizsgaFlashcards';

export type QuizType = 'multiple-choice' | 'flashcard';

export interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
  answer: number; // index of correct option
}

export interface FlashcardQuestion {
  type: 'flashcard';
  front: string; // text or image URL
  back: string; // text or image URL
  frontIsImage?: boolean; // if front is an image
  backIsImage?: boolean; // if back is an image
}

export type Question = MultipleChoiceQuestion | FlashcardQuestion;

export interface Quiz {
  name: string;
  questions: Question[];
}

export const quizzes: Quiz[] = [
  {
    name: 'Math',
    questions: [
      {
        type: 'multiple-choice',
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: 1,
      },
      {
        type: 'flashcard',
        front: 'What is the Pythagorean theorem?',
        back: 'a² + b² = c²',
      },
    ],
  },
//   {
//     name: 'Geography',
//     questions: [
//       {
//         type: 'multiple-choice',
//         question: 'What is the capital of France?',
//         options: ['Berlin', 'London', 'Paris', 'Madrid'],
//         answer: 2,
//       },
//       {
//         type: 'flashcard',
//         front: '/src/assets/react.svg',
//         back: 'React logo (example of image flashcard)',
//         frontIsImage: true,
//       },
//     ],
//   },
//   {
//     name: 'Test Subject',
//     questions: [
//       {
//         type: 'multiple-choice',
//         question: 'This is a very long multiple choice question to test how the layout handles questions that span multiple lines. Please read the entire question carefully before selecting your answer. What is the result of adding together all the numbers from 1 to 100, and then multiplying the sum by 2, and then dividing by 4, and then subtracting 50, and then adding 12345, and then dividing by 3?',
//         options: [
//           'The answer is a very long text that should wrap to multiple lines and not overflow the button. It is not the correct answer, but it is here to test the UI. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//           'Another extremely long answer option that is not correct, but is here to test how the button handles lots and lots of text. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
//           'The correct answer is: 4148.333333333333, and this answer is also intentionally long to test the UI. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
//           'A short answer.'
//         ],
//         answer: 2,
//       },
//       {
//         type: 'flashcard',
//         front: 'Explain the difference between synchronous and asynchronous programming in JavaScript, including how the event loop works, and provide an example of a situation where asynchronous code is necessary. This is a very long flashcard front to test the UI wrapping and layout.',
//         back: 'Synchronous code runs sequentially, blocking the thread until each operation completes. Asynchronous code allows other operations to run while waiting for tasks (like I/O) to finish. The event loop manages this by handling callbacks and promises. Example: Fetching data from an API without blocking the UI.',
//       },
//       {
//         type: 'multiple-choice',
//         question: 'Which of the following statements about the React reconciliation algorithm is correct? (This is a long question to test the UI. The reconciliation algorithm is a key part of React’s virtual DOM diffing process.)',
//         options: [
//           'React always re-renders the entire DOM tree from scratch whenever state changes.',
//           'React uses keys to identify which items have changed, are added, or are removed, and this helps optimize the update process. This answer is intentionally long to test the UI.',
//           'React only updates the DOM if the user clicks a button.',
//           'React never updates the DOM after the initial render.'
//         ],
//         answer: 1,
//       },
//       {
//         type: 'flashcard',
//         front: 'What is the airspeed velocity of an unladen swallow?',
//         back: 'African or European?',
//       },
//       {
//         type: 'multiple-choice',
//         question: 'In the context of web development, which of the following best describes the concept of “progressive enhancement”? (This is a long question for UI testing.)',
//         options: [
//           'Progressive enhancement is a strategy for web design that emphasizes core webpage content first, and then adds more advanced features for browsers that support them. This answer is long to test the UI.',
//           'It means building websites that only work in the latest browsers.',
//           'It refers to making websites progressively slower as more features are added.',
//           'It is a technique for progressively increasing the font size on a webpage.'
//         ],
//         answer: 0,
//       },
//       {
//         type: 'flashcard',
//         front: 'Describe in detail the process of HTTP request and response, including all the steps from the client typing a URL in the browser to the server sending back the HTML, and what happens in between (DNS lookup, TCP handshake, SSL negotiation, HTTP headers, etc.). This is a very long flashcard to test the UI.',
//         back: '1. User enters URL. 2. Browser looks up DNS. 3. TCP connection is established. 4. SSL/TLS handshake if HTTPS. 5. Browser sends HTTP request. 6. Server processes and sends HTTP response. 7. Browser renders HTML. Each step involves multiple sub-steps and protocols.',
//       },
//     ],
//   },
//   {
//     name: 'Coding',
//     questions: [
//       {
//         type: 'multiple-choice',
//         question: `Mi lesz a következő kód futtatásának eredménye?\npublic class Test extends Thread {\n    public void run() {\n        System.out.println(isAlive());\n    }\n    public static void main(String[] args) {\n        Test test = new Test();\n        System.out.println(test.isAlive());\n        test.start();\n    }\n}`,
//         options: [
//           'true true',
//           'false false',
//           'false true',
//           'true false',
//         ],
//         answer: 2,
//       },
//     ],
//   },
  {
    name: 'Nummod 1 B Beugró',
    questions: nummod1Questions.map((q, i) => ({
      type: 'flashcard' as const,
      front: q,
      back: `${import.meta.env.BASE_URL}nummod1vizsga/${i + 1}.png`,
      frontIsImage: false,
      backIsImage: true,
    })),
  },
  {
    name: 'Kripto Vizsga',
    questions: kriptovizsgaFlashcards,
  },
];

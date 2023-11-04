import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export default function ExercisesScreen(
  data: {
    phrase: string;
    pronunciation: string;
    rightAnswer: string[];
    tokens: string[];
    translation: string[];
  }[]
) {
  const [progress, setProgress] = useState(0);
  const [sentence, setSentence] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [tokens, setTokens] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [rightAnswer, setRightAnswer] = useState([]);
  const [translations, setTranslations] = useState([]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temp;
    }

    return shuffledArray;
  };

  const exercises = useLocation().state;

  const handleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(
      pronunciation ? pronunciation : ''
    );
    utterance.lang = 'it-IT';

    speechSynthesis.speak(utterance);
  };

  const checkAnswer = () => {
    if (answer!.join().toLowerCase() === rightAnswer!.join().toLowerCase()) {
      setProgress(progress + 1);
      setAnswer([]);
    } else {
      window.alert('Resposta incorreta');
    }
  };

  useEffect(() => {
    const exercise: {
      phrase: string;
      pronunciation: string;
      rightAnswer: string[];
      tokens: string[];
      translation: string[];
    } = exercises[progress];

    setPronunciation(exercise?.pronunciation);
    setTokens(shuffleArray(exercise?.tokens));
    setSentence(exercise?.phrase);
    setRightAnswer(exercise?.rightAnswer);
    setTranslations(exercise?.translation);
  }, [progress]);

  return (
    <div className="container">
      <progress
        className="progress bar"
        value={progress}
        max={exercises.length}
      ></progress>
      <br />
      <button
        className="btn btn-dark background-secondary"
        onClick={() => handleSpeech()}
      >
        <i className="bi bi-volume-up"></i>
      </button>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        {sentence !== '' &&
          sentence?.split(' ')!.map((word, index) => {
            return (
              <h4
                popover-bottom={translations[index]}
                style={{
                  margin: '0',
                }}
              >
                {word}
              </h4>
            );
          })}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '5px',
        }}
      >
        {answer.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      <br />
      <>
        {tokens?.length > 0 &&
          tokens.map((token) => (
            <button onClick={() => setAnswer([...answer, token])}>
              {token}
            </button>
          ))}
      </>
      <br />
      <button className="btn btn-success" onClick={() => checkAnswer()}>
        Próximo
      </button>
    </div>
  );
}

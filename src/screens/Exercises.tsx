import { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router";
import { HeaderComponent } from "../components/Header.component";
import useDrewlingoStore from "../modules/store";
import { ILearnedWords, TCourse } from "../types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSpeech } from "../modules/textToSpeech";

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
  const [sentence, setSentence] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [tokens, setTokens] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [rightAnswer, setRightAnswer] = useState([]);
  const [translations, setTranslations] = useState([]);

  const navigate = useNavigate();

  const { data: drewlingo, updateData } = useDrewlingoStore();

  const exercises = useLocation().state;

  const isWordInArray = () => {
    const isWordInTheList = drewlingo.learnedWords.find(
      (word) => word.translation == rightAnswer[0]
    );

    if (isWordInTheList) return [...drewlingo.learnedWords];
    else
      return [
        ...drewlingo.learnedWords,
        {
          translation: rightAnswer[0],
          token: sentence,
          pronunciation: pronunciation,
        },
      ];
  };

  const checkAnswer = () => {
    if (answer!.join().toLowerCase() === rightAnswer!.join().toLowerCase()) {
      if (progress < exercises!.length - 1) {
        setProgress(progress + 1);
        setAnswer([]);
        updateData({
          ...drewlingo,
          learnedWords: isWordInArray(),
          points: drewlingo.points + parseInt(String(Math.random() * 20)),
        });
        toast("Resposta correta!", {
          type: "success",
          position: "bottom-center",
          theme: "colored",
        });
      } else {
        navigate("/done");
      }
    } else {
      toast("Resposta incorreta!", {
        type: "error",
        position: "bottom-center",
        theme: "colored",
      });

      updateData({
        ...drewlingo,
        lives: drewlingo.lives - 1,
        progress: drewlingo.progress + 1,
      });
    }
  };

  useEffect(() => {
    if (drewlingo.lives <= 0) {
      navigate("/done");
    }
  }, [drewlingo.lives]);

  useEffect(() => {
    const exercise: {
      phrase: string;
      pronunciation: string;
      rightAnswer: string[];
      tokens: string[];
      translation: string[];
    } = exercises[progress];

    setPronunciation(exercise?.pronunciation);
    setTokens(exercise?.tokens);
    setSentence(exercise?.phrase);
    setRightAnswer(exercise?.rightAnswer);
    setTranslations(exercise?.translation);
  }, [progress]);

  return (
    <div>
      <ToastContainer />
      <HeaderComponent />
      <div
        className="container"
        style={{
          marginTop: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "8px",
          }}
        >
          <progress
            className="progress bar"
            style={{
              width: "50%",
            }}
            value={progress}
            max={exercises.length}
          ></progress>
          <div className="text text-danger">
            <i
              className="bi bi-heart-fill"
              style={{
                marginRight: "5px",
              }}
            ></i>
            {drewlingo.lives}
          </div>
        </div>
        <br />
        <button
          className="btn btn-dark background-secondary"
          onClick={() => handleSpeech(pronunciation, drewlingo.course)}
        >
          <i className="bi bi-volume-up"></i>
        </button>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {sentence !== "" &&
            sentence?.split(" ")!.map((word, index) => {
              return (
                <h4
                  popover-bottom={translations[index]}
                  style={{
                    margin: "0",
                  }}
                >
                  {word}
                </h4>
              );
            })}
        </div>
        <div
          style={{
            display: "flex",
            gap: "5px",
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
        <button
          style={{
            marginTop: "24px",
          }}
          className="btn btn-success"
          onClick={() => checkAnswer()}
        >
          Próximo
        </button>
        <button
          style={{
            marginTop: "24px",
          }}
          className="btn btn-danger"
          onClick={() => setAnswer([])}
        >
          Recomeçar
        </button>
      </div>
    </div>
  );
}

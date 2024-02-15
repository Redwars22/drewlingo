import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { HeaderComponent } from '../components/Header.component';
import useDrewlingoStore from '../modules/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shuffleArray } from '../utils/shuffle';

export function HomeScreen() {
  const {data, updateData} = useDrewlingoStore();

  const [lessons, setLessons] = useState<
    {
      title: string;
      icon: string;
      exercises: {
        phrase: string;
        pronunciation: string;
        rightAnswer: string[];
        tokens: string[];
        translation: string[];
      }[];
      enabled: boolean;
    }[]
  >([
    {
      title: '',
      icon: '',
      exercises: [
        {
          phrase: '',
          pronunciation: '',
          rightAnswer: [''],
          tokens: [''],
          translation: [''],
        },
      ],
      enabled: false,
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getLessons() {
      const courseData = await fetch('/lessons.json');
      const res = await courseData.json();

      if(data.lives == 0)
        updateData({
          ...data,
          lives: 3
        })

      setLessons(res[data.course]);
    }

    getLessons();
  }, [data.course]);

  useEffect(()=>{
    if(lessons.length > 0){
      const lessArr = lessons;

      for(let lesson = 0; lesson < lessArr.length; lesson++){
        lessArr[lesson].exercises = shuffleArray(lessArr[lesson].exercises);

        if(lessArr[lesson].exercises.length > 0){
          for(let ex = 0; ex < lessArr[lesson].exercises.length; ex++){
            const tk = lessArr[lesson].exercises[ex].tokens;
            lessArr[lesson].exercises[ex].tokens = shuffleArray(tk)
          }
        }
      }

      setLessons(lessArr)
    }
  }, [lessons])

  const getColor = ():string => {
    const colors = ["success", "danger", "info", "primary", "secundary", "warning"]

    return colors[Math.floor(Math.random() * colors.length)]
  }

  const LessonsArea = () => {
    return (
      <div style={{
        display: "flex",
        marginTop: "100px",
        maxWidth: "70vw",
        flexWrap: "wrap",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "space-between",
      }}>
        {lessons && lessons!.map((lesson, index) =>
          (
            <button
              className={`btn-${getColor()}`}
              disabled={!lesson.enabled || data.points < index * 33}
              style={{
                width: "150px",
                minWidth: "150px",
                height: "150px",
                textOverflow: "ellipsis"
              }}
              onClick={() =>
                navigate('/learn', { state: lessons[index]!.exercises })
              }
            >
              <i style={{
                fontSize: "2rem"
              }} className={`bi bi-${lesson!.icon}`}></i>
              <p>{lesson!.title}</p>
            </button>
          )
        )}
      </div>
    )
  }

  return (
    <>
    <ToastContainer/>
      <HeaderComponent />
      <LessonsArea />
    </>
  );
}

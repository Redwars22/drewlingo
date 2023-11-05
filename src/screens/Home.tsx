import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { HeaderComponent } from '../components/Header.component';

export function HomeScreen() {
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
      const data = await fetch('/lessons.json');
      const res = await data.json();

      setLessons(res!.regentish);
    }

    getLessons();
  }, []);

  const LessonsArea = () => {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "100px"
      }}>
        {lessons.map((lesson, index) =>
          (
            <button
              className="btn-success"
              disabled={!lesson.enabled}
              style={{
                width: "150px",
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
      <HeaderComponent />
      <LessonsArea />
    </>
  );
}

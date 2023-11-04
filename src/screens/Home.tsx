import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

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

  return (
    <>
      <h1 className="text text-success">Drewlingo</h1>
      {lessons.map((lesson, index) =>
        lesson.enabled ? (
          <button
            className="btn-success"
            onClick={() =>
              navigate('/learn', { state: lessons[index]!.exercises })
            }
          >
            <p>{lesson!.title}</p>
          </button>
        ) : (
          <></>
        )
      )}
    </>
  );
}

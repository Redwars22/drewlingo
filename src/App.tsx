
import './style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomeScreen } from './screens/Home';
import Exercises from './screens/Exercises';
import ExercisesScreen from './screens/Exercises';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (<>

    <Router>
      <Routes>
        <Route path="/" Component={() => <HomeScreen />} />
        <Route
          path="/learn"
          Component={(
            props: {
              phrase: string;
              pronunciation: string;
              rightAnswer: string[];
              tokens: string[];
              translation: string[];
            }[]
          ) => <ExercisesScreen {...props} />}
        />
      </Routes>
    </Router></>
  );
}

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginSignup from './Components/LoginSignup';
import TodoPage from './Components/TodoPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/TodoPage" element={<TodoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

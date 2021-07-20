import './App.css';
import MastermindBoard from './components/MastermindBoard/MastermindBoard';

export default function App() {
  return (
    <div className='App'>
      <h1>Can you guess the secret combination?</h1>
      <MastermindBoard />
    </div>
  );
}

import logo from './logo.svg';
import './App.css';
import { Sample } from './components/sample';
import './color-styles.css';
import '@coreui/coreui/dist/css/coreui.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Sample />
      </header>
    </div>
  );
}

export default App;

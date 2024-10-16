import logo from './logo.svg';
import './App.css';
import { GraphUI } from './components/GraphUI';
import './color-styles.css';
import '@coreui/coreui/dist/css/coreui.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GraphUI />
      </header>
    </div>
  );
}

export default App;

import './App.css';
import { Sample } from './components/sample';
import './color-styles.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth={false} className="App-header">
      <CssBaseline />
      <Sample/>
    </Container>
  );
}

export default App;

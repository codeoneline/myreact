import logo from './logo.svg';
import './App.css';
import * as sdk from './services/sdk';
import { useState, useEffect } from 'react';

function App() {
  const [fee, setFee] = useState(0);
  const [timestamp, setTimestamp] = useState(0);

  const refreshFee = async function() {
    const tmpFee = await sdk.getFee()
    const tmpTS = await sdk.getTimeStamp()
    setFee(tmpFee)
    setTimestamp(tmpTS)
  }

  useEffect(() => {
    let timer = setInterval(refreshFee, 10000);
    return () => {
      clearInterval(timer)
    }
  }, [fee, timestamp])
  return (
    <div className="App">
      <header className="App-header">
        <div>
          fee：{fee}
        </div>
        <div>
          timestamp: {timestamp}
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

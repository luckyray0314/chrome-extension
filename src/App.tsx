import './App.css';
import Connect from './pages/Connect';
import DetectedAddressList from './pages/DetectedAddressList';
import MessageTo from './pages/MessageTo';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <HashRouter>
        <Routes>
          <Route path="/addresslist" element={<DetectedAddressList />}></Route>
          <Route path="/messageTo" element={<MessageTo />}></Route>
          <Route path="/" element={<Connect />}></Route>
        </Routes>
      </HashRouter>
    </Web3ReactProvider>
    // <div className="App">
    //   <DetectedAddressList />
    //   <MessageTo />
    //   <Connect />
    // </div>
  );
}

export default App;

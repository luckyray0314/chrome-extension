import './App.css';
import Connect from './pages/Connect';
import DetectedAddressList from './pages/DetectedAddressList';
import MessageTo from './pages/MessageTo';
import { HashRouter, Routes, Route } from "react-router-dom";
import MessageList from "./pages/MessageList";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/addresslist" element={<DetectedAddressList />}></Route>
        <Route path="/messageTo/:id" element={<MessageTo />}></Route>
        <Route path="/" element={<Connect />}></Route>
        <Route path="/messagelist" element={<MessageList />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

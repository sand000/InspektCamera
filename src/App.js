import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CaptureComponent from "./components/Capture";
import Navbar from "./screen/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={CaptureComponent}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

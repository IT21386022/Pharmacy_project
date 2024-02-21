import './App.css';
import PharmacyRouter from "./router/PharmacyRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PharmacyRouter />
    </BrowserRouter>
  );
}

export default App;
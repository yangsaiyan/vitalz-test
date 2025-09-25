import "./App.css";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import View from "./pages/View";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="view" element={<View />} />
      </Routes>
    </div>
  );
}

export default App;

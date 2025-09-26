import "./App.css";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import View from "./pages/View";
import SimpleLayout from "./layout/SimpleLayout";

function App() {
  return (
    <div className="min-h-screen h-screen w-full">
      <Routes>
        <Route
          index
          element={
            <SimpleLayout>
              <Dashboard />
            </SimpleLayout>
          }
        />
        <Route
          path="view"
          element={
            <SimpleLayout>
              <View />
            </SimpleLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

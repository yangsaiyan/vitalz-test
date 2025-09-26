import "./App.css";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import View from "./pages/View";
import SimpleLayout from "./layout/SimpleLayout";
import { Toaster } from "./components/ui/sonner";

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
          path="view/:LoginEmail/:DeviceUserID/:DataType"
          element={
            <SimpleLayout>
              <View />
            </SimpleLayout>
          }
        />
      </Routes>
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}

export default App;

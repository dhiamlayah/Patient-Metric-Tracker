import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Patient from "./pages/Patient";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/patients/:id" element={<Patient />} />
      </Routes>
    </Router>
  );
}

export default App;

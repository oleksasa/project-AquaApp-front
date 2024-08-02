import { Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "./components/SharedLayout/SharedLayout";

const HomePage = () => {
  return <div>Home Page</div>;
};

function App() {
  return (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;

// import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRouter from "./AllRouter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <div className="main">
          <AllRouter />
          <ToastContainer />
        </div>{" "}
      </header>{" "}
    </div>
  );
}

export default App;

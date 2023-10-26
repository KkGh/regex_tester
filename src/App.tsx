import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import "./App.css";
import { TESTINPUT, TESTREG } from "./constants";
import { MainContent } from "./pages/main/MainContent";

const App = () => {
  return (
    <div>
      <Navbar className="header">
        <Navbar.Brand href="/">Regex Tester</Navbar.Brand>
      </Navbar>

      <main className="py-3">
        <MainContent initialReg={TESTREG} initialText={TESTINPUT} />
      </main>
    </div>
  );
};

export default App;

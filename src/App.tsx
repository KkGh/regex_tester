import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import "./App.css";
import { TESTINPUT, TESTREG } from "./constants";
import { MainContent } from "./pages/main/MainContent";

const App = () => {
  return (
    <div>
      <Navbar className="header px-3" style={{ height: "56px" }}>
        <Navbar.Brand href="./">Regex Tester</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/KkGh/regex_tester"
          >
            <FaGithub size="24px" />
          </Nav.Link>
        </Nav>
      </Navbar>

      <main className="py-3">
        <MainContent initialReg={TESTREG} initialText={TESTINPUT} />
      </main>
    </div>
  );
};

export default App;

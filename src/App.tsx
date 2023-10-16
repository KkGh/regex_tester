import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import './App.css';
import { MainContent } from './pages/main/MainContent';

const App = () => {
  return (
    <div>
      <Navbar className='header'>
        <Navbar.Brand href='/'>Regex Tester</Navbar.Brand>
      </Navbar>

      <main className='py-3'>
        <MainContent />
      </main>

      <footer className='p-2 text-center footer'>
        <div><small>&copy; kos tools. All rights reserved.</small></div>
      </footer>
    </div>
  );
};

export default App;

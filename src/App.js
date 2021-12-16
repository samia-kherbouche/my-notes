import {
  Route,
  Routes,
  
} from "react-router-dom";
import Header from './components/Header'
import NotesPage from './pages/NotesPage';
import NotePage from './pages/NotePage'
import './App.css';

function App() {
  return (
    
      <div className='container dark'>
      <div className='app'>
      <Header/>
        <Routes>
        <Route path="/"  element={<NotesPage/>} />
        <Route path="/note/:id" render={ props => <NotePage {...props} /> } element={<NotePage />}/>
       
      </Routes>
      </div>
       
        
      </div>
    
  );
}

export default App;

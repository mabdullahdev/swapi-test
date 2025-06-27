import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterListPage from './pages/CharacterListPage';
import CharacterDetailPage from './pages/CharacterDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CharacterListPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

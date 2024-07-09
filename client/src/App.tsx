import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}


export default App;

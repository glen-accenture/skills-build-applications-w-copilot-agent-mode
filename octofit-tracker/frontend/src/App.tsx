import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <h1>OctoFit Tracker</h1>
      <p>Modern multi-tier fitness tracker frontend powered by React 19 and Vite.</p>
      <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>Build your activity logging, teams, leaderboard, and workout suggestions here.</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

import './App.css';
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="app-container">
      <Header />
        <div className="App">
        <header className="App-header">
          <Home />
          <Footer />
        </header>
      </div>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="brand">eCommerceApp</Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <main className="container">
      <h1>Welcome to eCommerceApp</h1>
      <p>Browse our latest products below.</p>

      <div className="grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card">
            <h2>Product {i}</h2>
            <p>Demo product description.</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function Cart() {
  return (
    <main className="container">
      <h1>Your Cart</h1>
      <p>Cart is empty.</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
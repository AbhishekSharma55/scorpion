import { useEffect, useState } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function StatCard({ label, value }) {
  return (
    <div className="card stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value ?? '—'}</div>
    </div>
  );
}

function App() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [statsRes, usersRes, productsRes] = await Promise.all([
          fetch(`${API_URL}/rpc/post_stats`),
          fetch(`${API_URL}/users?is_active=eq.true&order=created_at.desc&limit=5`),
          fetch(`${API_URL}/products?order=rating.desc&limit=5`),
        ]);

        if (!statsRes.ok || !usersRes.ok || !productsRes.ok) {
          throw new Error('PostgREST API returned a non-OK response');
        }

        const statsBody = await statsRes.json();
        const usersBody = await usersRes.json();
        const productsBody = await productsRes.json();

        if (cancelled) return;
        setStats(Array.isArray(statsBody) ? statsBody[0] : statsBody);
        setUsers(usersBody);
        setProducts(productsBody);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Scorpion Maintenance</h1>
          <p className="subtitle">Admin dashboard · PostgREST @ {API_URL}</p>
        </div>
        <a className="link" href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
          ← Back to frontend
        </a>
      </header>

      {error && (
        <div className="alert">
          <strong>Cannot reach API.</strong> {error}
          <div className="alert-hint">
            Is <code>docker compose</code> running? Try{' '}
            <code>docker compose up</code>.
          </div>
        </div>
      )}

      <section className="stats">
        <StatCard label="Total Posts" value={stats?.total_posts} />
        <StatCard label="Published" value={stats?.published_posts} />
        <StatCard label="Drafts" value={stats?.draft_posts} />
        <StatCard label="Archived" value={stats?.archived_posts} />
        <StatCard label="Total Views" value={stats?.total_views} />
        <StatCard label="Avg Views" value={stats?.avg_views} />
      </section>

      <div className="grid">
        <section className="card">
          <h2>Recent Active Users</h2>
          {loading ? (
            <p className="muted">Loading…</p>
          ) : users.length === 0 ? (
            <p className="muted">No users found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="card">
          <h2>Top-Rated Products</h2>
          {loading ? (
            <p className="muted">Loading…</p>
          ) : products.length === 0 ? (
            <p className="muted">No products found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>${p.price}</td>
                    <td>{p.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      <footer className="footer">
        Scorpion · Maintenance app · React {process.env.REACT_APP_VERSION || ''}
      </footer>
    </div>
  );
}

export default App;

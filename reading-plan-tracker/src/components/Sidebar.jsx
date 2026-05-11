import { PUBLICATIONS } from '../data/sampleArticles';

export function Sidebar({ stats, activeFilter, setActiveFilter, activeTopic, setActiveTopic, topics, onImport, onReset }) {
  const readPct = stats.total ? Math.round((stats.read / stats.total) * 100) : 0;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title">Reading Plan</h1>
        <p className="app-subtitle">Stay on track</p>
      </div>

      <div className="progress-section">
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${readPct}%` }} />
        </div>
        <div className="progress-stats">
          <span>{stats.read} read</span>
          <span>{stats.unread} left</span>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-label">Publication</h3>
        <div className="filter-group">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          {Object.entries(PUBLICATIONS).map(([key, pub]) => (
            <button
              key={key}
              className={`filter-btn pub-filter ${activeFilter === key ? 'active' : ''}`}
              style={activeFilter === key ? { backgroundColor: pub.color, borderColor: pub.color, color: 'white' } : {}}
              onClick={() => setActiveFilter(key)}
            >
              {pub.abbr}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-label">Topic</h3>
        <div className="filter-group topic-group">
          {topics.map(topic => (
            <button
              key={topic}
              className={`filter-btn topic-btn ${activeTopic === topic ? 'active' : ''}`}
              onClick={() => setActiveTopic(topic)}
            >
              {topic === 'all' ? 'All Topics' : topic}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-stats">
        <div className="stat-item">
          <span className="stat-num">{stats.read}</span>
          <span className="stat-name">Read</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{stats.skipped}</span>
          <span className="stat-name">Skipped</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{stats.saved}</span>
          <span className="stat-name">Saved</span>
        </div>
      </div>

      <div className="sidebar-actions">
        <button className="sidebar-btn import-btn" onClick={onImport}>Import Articles</button>
        <button className="sidebar-btn reset-btn" onClick={onReset}>Reset Demo</button>
      </div>
    </aside>
  );
}

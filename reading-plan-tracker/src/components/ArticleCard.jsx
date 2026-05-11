import { PUBLICATIONS } from '../data/sampleArticles';

export function ArticleCard({ article, onRead, onSkip, onSave, position, total }) {
  const pub = PUBLICATIONS[article.publication];

  return (
    <div className="article-card" key={article.id}>
      <div className="card-meta">
        <span className="pub-badge" style={{ backgroundColor: pub.color }}>
          {pub.abbr}
        </span>
        <span className="topic-tag">{article.topic}</span>
        <span className="article-date">{formatDate(article.date)}</span>
        <span className="queue-position">{position} of {total} unread</span>
      </div>

      <h2 className="article-title">{article.title}</h2>
      <p className="article-summary">{article.summary}</p>

      {article.url && (
        <a className="article-link" href={article.url} target="_blank" rel="noreferrer">
          Open original ↗
        </a>
      )}

      <div className="card-actions">
        <button className="action-btn skip" onClick={() => onSkip(article.id)}>
          <span className="btn-icon">&#8594;</span>
          <span className="btn-label">Skip</span>
          <kbd>S</kbd>
        </button>
        <button className="action-btn read" onClick={() => onRead(article.id)}>
          <span className="btn-icon">&#10003;</span>
          <span className="btn-label">Read</span>
          <kbd>R</kbd>
        </button>
        <button className="action-btn save" onClick={() => onSave(article.id)}>
          <span className="btn-icon">&#9829;</span>
          <span className="btn-label">Save</span>
          <kbd>L</kbd>
        </button>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

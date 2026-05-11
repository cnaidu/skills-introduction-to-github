import { useState } from 'react';
import { normalizePub } from '../data/sampleArticles';

const TEMPLATE = JSON.stringify({
  articles: [
    {
      id: 'unique-id-1',
      title: 'Article Title',
      publication: 'WSJ',
      topic: 'Economy',
      summary: 'Brief summary of the article.',
      url: 'https://example.com',
      date: '2026-05-11',
      priority: 1,
      status: 'unread',
    }
  ]
}, null, 2);

export function ImportModal({ onImport, onClose }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleImport() {
    try {
      const data = JSON.parse(text);
      const articles = Array.isArray(data) ? data : data.articles;
      if (!Array.isArray(articles)) throw new Error('Expected an array or { articles: [...] }');
      const normalized = articles.map((a, i) => ({
        id: a.id ?? `import-${Date.now()}-${i}`,
        title: a.title ?? 'Untitled',
        publication: normalizePub(a.publication ?? 'wsj'),
        topic: a.topic ?? 'General',
        summary: a.summary ?? '',
        url: a.url ?? '',
        date: a.date ?? new Date().toISOString().split('T')[0],
        priority: a.priority ?? 3,
        status: 'unread',
      }));
      onImport(normalized);
      onClose();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Import Articles</h2>
          <button className="modal-close" onClick={onClose}>&#x2715;</button>
        </div>
        <p className="modal-desc">
          Paste JSON from your article summarizing skill. Accepts{' '}
          <code>{'{"articles": [...]}'}</code> or a plain array.
          Publications: WSJ, BBG, FT, Economist, Athletic, New Yorker.
        </p>
        <details className="template-details">
          <summary>Show expected format</summary>
          <pre className="template-code">{TEMPLATE}</pre>
        </details>
        <textarea
          className="import-textarea"
          value={text}
          onChange={e => { setText(e.target.value); setError(''); }}
          placeholder="Paste JSON here..."
          rows={12}
        />
        {error && <p className="import-error">{error}</p>}
        <div className="modal-footer">
          <button className="sidebar-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn read modal-import-btn" onClick={handleImport} disabled={!text.trim()}>
            Import
          </button>
        </div>
      </div>
    </div>
  );
}

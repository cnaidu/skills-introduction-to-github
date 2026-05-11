import { useEffect, useState } from 'react';
import { useArticles } from './hooks/useArticles';
import { ArticleCard } from './components/ArticleCard';
import { Sidebar } from './components/Sidebar';
import { ImportModal } from './components/ImportModal';

function EmptyState({ hasFilter }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">&#x1F389;</div>
      <h2>{hasFilter ? 'No articles match this filter' : 'All caught up!'}</h2>
      <p>
        {hasFilter
          ? 'Try a different filter or import more articles.'
          : "You've worked through your entire queue. Import more or reset the demo."}
      </p>
    </div>
  );
}

export default function App() {
  const {
    current, queue,
    activeFilter, setActiveFilter,
    activeTopic, setActiveTopic,
    topics, stats,
    markRead, skip, saveLater,
    importArticles, resetAll,
  } = useArticles();

  const [showImport, setShowImport] = useState(false);
  const [flash, setFlash] = useState(null);

  function doRead(id) {
    setFlash('read');
    setTimeout(() => setFlash(null), 350);
    markRead(id);
  }
  function doSkip(id) {
    setFlash('skip');
    setTimeout(() => setFlash(null), 350);
    skip(id);
  }
  function doSave(id) {
    setFlash('save');
    setTimeout(() => setFlash(null), 350);
    saveLater(id);
  }

  useEffect(() => {
    function handleKey(e) {
      if (!current || showImport) return;
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'r' || e.key === 'R') doRead(current.id);
      if (e.key === 's' || e.key === 'S') doSkip(current.id);
      if (e.key === 'l' || e.key === 'L') doSave(current.id);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, showImport]);

  const hasFilter = activeFilter !== 'all' || activeTopic !== 'all';

  return (
    <div className={`app-layout${flash ? ` flash-${flash}` : ''}`}>
      <Sidebar
        stats={stats}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        topics={topics}
        onImport={() => setShowImport(true)}
        onReset={resetAll}
      />
      <main className="main-area">
        {current ? (
          <ArticleCard
            article={current}
            onRead={doRead}
            onSkip={doSkip}
            onSave={doSave}
            position={1}
            total={queue.length}
          />
        ) : (
          <EmptyState hasFilter={hasFilter} />
        )}
        <div className="keyboard-hint">
          <span><kbd>R</kbd> Read</span>
          <span><kbd>S</kbd> Skip</span>
          <span><kbd>L</kbd> Save for later</span>
        </div>
      </main>
      {showImport && (
        <ImportModal
          onImport={importArticles}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  );
}

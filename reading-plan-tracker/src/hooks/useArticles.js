import { useState, useEffect, useCallback } from 'react';
import { SAMPLE_ARTICLES } from '../data/sampleArticles';

const STORAGE_KEY = 'reading-plan-articles';

export function useArticles() {
  const [articles, setArticles] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SAMPLE_ARTICLES;
    } catch {
      return SAMPLE_ARTICLES;
    }
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTopic, setActiveTopic] = useState('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  }, [articles]);

  const filtered = articles.filter(a => {
    const pubMatch = activeFilter === 'all' || a.publication === activeFilter;
    const topicMatch = activeTopic === 'all' || a.topic === activeTopic;
    return pubMatch && topicMatch;
  });

  const queue = filtered.filter(a => a.status === 'unread');
  const current = queue[0] ?? null;

  const updateStatus = useCallback((id, status) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }, []);

  const markRead = useCallback((id) => updateStatus(id, 'read'), [updateStatus]);
  const skip = useCallback((id) => updateStatus(id, 'skipped'), [updateStatus]);
  const saveLater = useCallback((id) => updateStatus(id, 'saved'), [updateStatus]);

  const importArticles = useCallback((newArticles) => {
    setArticles(prev => {
      const existingIds = new Set(prev.map(a => a.id));
      const toAdd = newArticles.filter(a => !existingIds.has(a.id));
      return [...prev, ...toAdd];
    });
  }, []);

  const resetAll = useCallback(() => {
    setArticles(SAMPLE_ARTICLES);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const topics = ['all', ...new Set(articles.map(a => a.topic))];

  const stats = {
    total: articles.length,
    read: articles.filter(a => a.status === 'read').length,
    skipped: articles.filter(a => a.status === 'skipped').length,
    saved: articles.filter(a => a.status === 'saved').length,
    unread: articles.filter(a => a.status === 'unread').length,
  };

  return {
    articles,
    current,
    queue,
    filtered,
    activeFilter,
    setActiveFilter,
    activeTopic,
    setActiveTopic,
    topics,
    stats,
    markRead,
    skip,
    saveLater,
    importArticles,
    resetAll,
  };
}

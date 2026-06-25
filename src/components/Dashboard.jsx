import React from 'react';

export default function Dashboard({ total, pending, completed, currentFilter, setCurrentFilter }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const CIRCUMFERENCE = 2 * Math.PI * 24; // r = 24
  const strokeDashoffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <section className="dashboard-stats" aria-label="Task Analytics Dashboard">
      <div 
        className={`stat-card interactive ${currentFilter === 'all' ? 'active' : ''}`} 
        id="stat-total-card"
        onClick={() => setCurrentFilter && setCurrentFilter('all')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setCurrentFilter && setCurrentFilter('all');
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Total tasks: ${total}. Click to filter all tasks.`}
      >
        <div className="stat-details">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-icon bg-indigo-soft">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H9.75M8.25 21h8.25a2.25 2.25 0 0 0 2.25-2.25V5.75A2.25 2.25 0 0 0 16.5 3.5h-8.25A2.25 2.25 0 0 0 6 5.75v13a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
      </div>

      <div 
        className={`stat-card interactive ${currentFilter === 'pending' ? 'active' : ''}`} 
        id="stat-pending-card"
        onClick={() => setCurrentFilter && setCurrentFilter('pending')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setCurrentFilter && setCurrentFilter('pending');
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Pending tasks: ${pending}. Click to filter pending tasks.`}
      >
        <div className="stat-details">
          <span className="stat-label">Pending</span>
          <span className="stat-value text-warning">{pending}</span>
        </div>
        <div className="stat-icon bg-warning-soft">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>

      <div 
        className={`stat-card interactive ${currentFilter === 'completed' ? 'active' : ''}`} 
        id="stat-completed-card"
        onClick={() => setCurrentFilter && setCurrentFilter('completed')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setCurrentFilter && setCurrentFilter('completed');
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Completed tasks: ${completed}. Click to filter completed tasks.`}
      >
        <div className="stat-details">
          <span className="stat-label">Completed</span>
          <span className="stat-value text-success">{completed}</span>
        </div>
        <div className="stat-icon bg-success-soft">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
      </div>

      <div className="stat-card progress-card" id="stat-progress-card">
        <div className="stat-details">
          <span className="stat-label">Completion</span>
          <span className="stat-value">{percent}%</span>
        </div>
        <div className="progress-ring-container">
          <svg className="progress-ring" width="56" height="56">
            <circle 
              className="progress-ring__circle-bg" 
              stroke="rgba(255, 255, 255, 0.05)" 
              strokeWidth="4.5" 
              fill="transparent" 
              r="24" 
              cx="28" 
              cy="28"
            />
            <circle 
              className="progress-ring__circle" 
              stroke="url(#progress-gradient)" 
              strokeWidth="4.5" 
              fill="transparent" 
              r="24" 
              cx="28" 
              cy="28"
              style={{
                strokeDasharray: `${CIRCUMFERENCE} ${CIRCUMFERENCE}`,
                strokeDashoffset: strokeDashoffset
              }}
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}

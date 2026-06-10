import React, { useRef, useState, useEffect } from 'react';

export default function TodoToolbar({
  searchQuery,
  setSearchQuery,
  currentFilter,
  setCurrentFilter,
  currentSort,
  setCurrentSort,
  counts,
  onClearCompleted
}) {
  const [sliderStyle, setSliderStyle] = useState({});
  const allTabRef = useRef(null);
  const pendingTabRef = useRef(null);
  const completedTabRef = useRef(null);

  // Function to compute sliding indicator styling parameters
  const updateSlider = () => {
    let activeTab = null;
    if (currentFilter === 'all') activeTab = allTabRef.current;
    if (currentFilter === 'pending') activeTab = pendingTabRef.current;
    if (currentFilter === 'completed') activeTab = completedTabRef.current;

    if (activeTab) {
      setSliderStyle({
        width: `${activeTab.offsetWidth}px`,
        transform: `translateX(${activeTab.offsetLeft - 3}px)` // adjust based on left padding
      });
    }
  };

  useEffect(() => {
    updateSlider();

    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [currentFilter, counts]);

  return (
    <>
      {/* TOOLBAR (SEARCH & SORT) */}
      <div className="task-toolbar">
        {/* Search */}
        <div className="search-box">
          <span className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" />
            </svg>
          </span>
          <input 
            type="search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..." 
            aria-label="Search Tasks"
            autoComplete="off"
          />
          {searchQuery.length > 0 && (
            <button 
              type="button" 
              className="search-clear-btn" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="sort-box">
          <label htmlFor="task-sort-select" className="sr-only">Sort by</label>
          <div className="select-wrapper">
            <select 
              id="task-sort-select" 
              value={currentSort}
              onChange={(e) => setCurrentSort(e.target.value)}
              aria-label="Sort options"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha-asc">Alphabetical (A-Z)</option>
              <option value="alpha-desc">Alphabetical (Z-A)</option>
            </select>
            <span className="select-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="task-filter-row">
        {/* Segmented Filters */}
        <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
          <div 
            className="filter-indicator-slider" 
            style={sliderStyle}
          ></div>
          <button 
            type="button" 
            className={`filter-tab-btn ${currentFilter === 'all' ? 'active' : ''}`}
            role="tab" 
            aria-selected={currentFilter === 'all'} 
            aria-controls="todo-list"
            ref={allTabRef}
            onClick={() => setCurrentFilter('all')}
          >
            All <span className="tab-badge">{counts.all}</span>
          </button>
          <button 
            type="button" 
            className={`filter-tab-btn ${currentFilter === 'pending' ? 'active' : ''}`}
            role="tab" 
            aria-selected={currentFilter === 'pending'} 
            aria-controls="todo-list"
            ref={pendingTabRef}
            onClick={() => setCurrentFilter('pending')}
          >
            Pending <span className="tab-badge">{counts.pending}</span>
          </button>
          <button 
            type="button" 
            className={`filter-tab-btn ${currentFilter === 'completed' ? 'active' : ''}`}
            role="tab" 
            aria-selected={currentFilter === 'completed'} 
            aria-controls="todo-list"
            ref={completedTabRef}
            onClick={() => setCurrentFilter('completed')}
          >
            Completed <span className="tab-badge">{counts.completed}</span>
          </button>
        </div>

        {/* Bulk Actions */}
        <button 
          type="button" 
          className="btn btn-secondary-danger" 
          disabled={counts.completed === 0}
          onClick={onClearCompleted}
          aria-label="Clear all completed tasks"
        >
          <span>Clear Completed</span>
        </button>
      </div>
    </>
  );
}

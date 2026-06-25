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

  // Custom Select Dropdown State & Refs
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alpha-asc', label: 'Alphabetical (A-Z)' },
    { value: 'alpha-desc', label: 'Alphabetical (Z-A)' }
  ];

  const currentOption = sortOptions.find(opt => opt.value === currentSort) || sortOptions[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleOptionSelect = (val) => {
    setCurrentSort(val);
    setIsOpen(false);
  };

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
        <div className="sort-box" ref={dropdownRef}>
          <span className="sr-only">Sort by</span>
          <div className="custom-select-wrapper">
            <button
              type="button"
              className={`custom-select-trigger ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-label={`Sort by: ${currentOption.label}`}
            >
              <span>{currentOption.label}</span>
              <span className={`select-arrow ${isOpen ? 'open' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>
            
            {isOpen && (
              <ul 
                className="custom-select-options" 
                role="listbox" 
                aria-label="Sort options"
              >
                {sortOptions.map((opt) => {
                  const isSelected = opt.value === currentSort;
                  return (
                    <li
                      key={opt.value}
                      className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleOptionSelect(opt.value)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOptionSelect(opt.value);
                        }
                      }}
                    >
                      <span className="option-label">{opt.label}</span>
                      {isSelected && (
                        <span className="option-check">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
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

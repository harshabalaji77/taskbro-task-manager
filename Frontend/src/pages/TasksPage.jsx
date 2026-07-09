import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';

const TasksPage = ({
  tasks,
  setIsModalOpen,
  setTaskToEdit,
  handleToggleComplete,
  handleDeleteTask,
  handleEditTask,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all', 'low', 'medium', 'high'
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'pending' && !task.completed);

    const matchesPriority =
      priorityFilter === 'all' ||
      (task.priority || 'medium') === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="py-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#6366f1] text-white flex items-center justify-center shadow-lg select-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">All Tasks</h2>
              <p className="text-base text-gray-600 mt-1 font-medium">
                Manage, filter, and organize all your tasks in one place.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setTaskToEdit(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors whitespace-nowrap"
          >
            <span className="mr-2 text-lg leading-none font-normal">+</span>
            New Task
          </button>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-8">
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <div className="flex items-center gap-3">
          {/* Status Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                setIsStatusOpen(!isStatusOpen);
                setIsPriorityOpen(false);
              }}
              className="w-full sm:w-44 flex items-center justify-between pl-4 pr-3.5 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 hover:border-gray-400 transition-colors cursor-pointer text-gray-700 font-medium text-left"
            >
              <span>
                {statusFilter === 'all' && 'All Statuses'}
                {statusFilter === 'pending' && 'Pending'}
                {statusFilter === 'completed' && 'Completed'}
              </span>
              <svg className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isStatusOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsStatusOpen(false)} />
                <div className="absolute left-0 right-0 mt-1.5 w-full sm:w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 text-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter('all');
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      statusFilter === 'all' ? 'text-gray-900 font-bold bg-gray-50' : 'text-gray-700 font-medium'
                    }`}
                  >
                    All Statuses
                    {statusFilter === 'all' && (
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter('pending');
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      statusFilter === 'pending' ? 'text-gray-900 font-bold bg-gray-50' : 'text-gray-700 font-medium'
                    }`}
                  >
                    Pending
                    {statusFilter === 'pending' && (
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter('completed');
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      statusFilter === 'completed' ? 'text-gray-900 font-bold bg-gray-50' : 'text-gray-700 font-medium'
                    }`}
                  >
                    Completed
                    {statusFilter === 'completed' && (
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Priority Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                setIsPriorityOpen(!isPriorityOpen);
                setIsStatusOpen(false);
              }}
              className="w-full sm:w-44 flex items-center justify-between pl-4 pr-3.5 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 hover:border-gray-400 transition-colors cursor-pointer text-gray-700 font-medium text-left"
            >
              <span>
                {priorityFilter === 'all' && 'All Priorities'}
                {priorityFilter === 'low' && 'Low Priority'}
                {priorityFilter === 'medium' && 'Medium Priority'}
                {priorityFilter === 'high' && 'High Priority'}
              </span>
              <svg className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isPriorityOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isPriorityOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsPriorityOpen(false)} />
                <div className="absolute left-0 right-0 mt-1.5 w-full sm:w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 text-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setPriorityFilter('all');
                      setIsPriorityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      priorityFilter === 'all' ? 'text-gray-900 font-bold bg-gray-50' : 'text-gray-700 font-medium'
                    }`}
                  >
                    All Priorities
                    {priorityFilter === 'all' && (
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPriorityFilter('low');
                      setIsPriorityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      priorityFilter === 'low' ? 'text-gray-900 font-bold bg-gray-50' : 'text-gray-700 font-medium'
                    }`}
                  >
                    Low Priority
                    {priorityFilter === 'low' && (
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPriorityFilter('medium');
                      setIsPriorityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      priorityFilter === 'medium' ? 'text-gray-900 font-bold bg-gray-50' : 'text-gray-700 font-medium'
                    }`}
                  >
                    Medium Priority
                    {priorityFilter === 'medium' && (
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPriorityFilter('high');
                      setIsPriorityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      priorityFilter === 'high' ? 'text-gray-900 font-bold bg-gray-50' : 'text-gray-700 font-medium'
                    }`}
                  >
                    High Priority
                    {priorityFilter === 'high' && (
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Task List */}
      <TaskList
        tasks={sortedTasks}
        searchTerm=""
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </main>
  );
};

export default TasksPage;
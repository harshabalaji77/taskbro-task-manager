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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">All Tasks</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage, filter, and organize all your tasks in one place.
          </p>
        </div>
        <button
          onClick={() => {
            setTaskToEdit(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors whitespace-nowrap"
        >
          <span className="mr-2 text-lg leading-none font-normal">+</span>
          Add Task
        </button>
      </div>

      {/* Filter and Search Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-8">
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <div className="flex items-center gap-3">
          {/* Status Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-44 pl-4 pr-10 py-2.5 border border-gray-305 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 hover:border-gray-400 transition-colors appearance-none cursor-pointer text-gray-700 font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Priority Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full sm:w-44 pl-4 pr-10 py-2.5 border border-gray-305 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 hover:border-gray-400 transition-colors appearance-none cursor-pointer text-gray-700 font-medium"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
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
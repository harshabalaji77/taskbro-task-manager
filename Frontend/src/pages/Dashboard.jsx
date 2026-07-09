import { Link } from 'react-router-dom';
import TaskStats from '../components/TaskStats';
import TaskChart from '../components/TaskChart';
import TaskList from '../components/TaskList';

const Dashboard = ({
  user,
  tasks,
  setIsModalOpen,
  setTaskToEdit,
  handleToggleComplete,
  handleDeleteTask,
  handleEditTask,
  completedTasks,
  inProgressTasks,
}) => {
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="py-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#6366f1] text-white flex items-center justify-center font-bold text-2xl shadow-lg select-none">
              {user?.username ? user.username[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome back, {user?.username || 'user'}!
              </h2>
              <p className="text-base text-gray-600 mt-1 font-medium">
                Your task manager for staying organized and productive.
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

      <TaskStats
        totalTasks={tasks.length}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
      />

      <TaskChart tasks={tasks} />

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Recent Tasks</h3>
        <Link
          to="/tasks"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          View All
          <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <TaskList
        tasks={recentTasks}
        searchTerm=""
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </main>
  );
};

export default Dashboard;
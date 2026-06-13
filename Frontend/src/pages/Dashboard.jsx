import TaskStats from '../components/TaskStats';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';

const Dashboard = ({
  user,
  tasks,
  searchTerm,
  setSearchTerm,
  isModalOpen,
  setIsModalOpen,
  taskToEdit,
  setTaskToEdit,
  handleAddTask,
  handleToggleComplete,
  handleDeleteTask,
  handleEditTask,
  completedTasks,
  inProgressTasks,
}) => {
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
        </div>
      </div>

      <TaskStats
        totalTasks={tasks.length}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
      />

      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
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

      <TaskList
        tasks={tasks}
        searchTerm={searchTerm}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        onAddTask={handleAddTask}
        taskToEdit={taskToEdit}
      />
    </main>
  );
};

export default Dashboard;
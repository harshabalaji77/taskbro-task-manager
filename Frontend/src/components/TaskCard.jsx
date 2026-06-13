import React from 'react';

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
      <div className="p-5">
        <div className="mb-3">
          <div className="flex items-start space-x-3 mb-2">
            <div 
              onClick={() => onToggleComplete(task.id)}
              className="relative mt-1 cursor-pointer"
            >
              <div className={`h-4 w-4 rounded border-2 transition-all flex items-center justify-center ${
                task.completed 
                  ? 'bg-green-600 border-green-600' 
                  : 'bg-white border-gray-300'
              }`}>
                {task.completed && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </div>
            <h3 className={`text-base font-medium flex-1 transition-colors ${
              task.completed ? 'text-gray-400' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
          </div>
          {task.description && (
            <p className={`text-sm leading-relaxed transition-colors truncate ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          )}
          {!task.dueDate && <div></div>}
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              aria-label="Edit task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              aria-label="Delete task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
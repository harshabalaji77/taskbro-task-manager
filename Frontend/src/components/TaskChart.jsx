import React from 'react';

const TaskChart = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const lowPriority = tasks.filter((t) => t.priority === 'low').length;
  const mediumPriority = tasks.filter((t) => t.priority === 'medium' || !t.priority).length;
  const highPriority = tasks.filter((t) => t.priority === 'high').length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Radial gauge settings
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

      {/* Left Card: Completion Rate */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Completion rate</h3>
          <p className="text-xs text-gray-400 mt-0.5">Overview of done vs. pending tasks</p>
        </div>

        <div className="flex items-center gap-5">
          {/* SVG Radial Gauge — dark blue */}
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#f3f4f6"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#1e3a5f"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">{completionRate}%</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Done</span>
            </div>
          </div>

          {/* Legend + progress */}
          <div className="flex flex-col gap-2.5 flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-gray-500">
                <span className="w-2 h-2 rounded-full" style={{ background: '#1e3a5f' }}></span>
                Completed
              </span>
              <span className="font-semibold text-gray-800">{completed} · {completionRate}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-gray-500">
                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                Pending
              </span>
              <span className="font-semibold text-gray-800">{pending} · {100 - completionRate}%</span>
            </div>
            <div className="mt-1">
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${completionRate}%`, background: '#1e3a5f' }}
                ></div>
              </div>
              <p className="text-[10.5px] text-gray-400 mt-1">{completionRate}% of goal reached</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Card: Priority Breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Priority breakdown</h3>
          <p className="text-xs text-gray-400 mt-0.5">Task count by priority level</p>
        </div>

        <div className="space-y-3.5">
          {/* High Priority */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-500 mb-1.5">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                High priority
              </span>
              <span className="font-semibold text-gray-700">
                {highPriority} {highPriority === 1 ? 'task' : 'tasks'} · {total > 0 ? Math.round((highPriority / total) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-red-400 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${total > 0 ? (highPriority / total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Medium Priority */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-500 mb-1.5">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                Medium priority
              </span>
              <span className="font-semibold text-gray-700">
                {mediumPriority} {mediumPriority === 1 ? 'task' : 'tasks'} · {total > 0 ? Math.round((mediumPriority / total) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-orange-400 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${total > 0 ? (mediumPriority / total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Low Priority */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-500 mb-1.5">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Low priority
              </span>
              <span className="font-semibold text-gray-700">
                {lowPriority} {lowPriority === 1 ? 'task' : 'tasks'} · {total > 0 ? Math.round((lowPriority / total) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${total > 0 ? (lowPriority / total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <p className="text-xs text-gray-400">Total tasks tracked</p>
          <p className="text-sm font-semibold text-gray-800">{total} tasks</p>
        </div>
      </div>

    </div>
  );
};

export default TaskChart;
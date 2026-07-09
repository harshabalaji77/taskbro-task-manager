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

  const lowPercent = total > 0 ? Math.round((lowPriority / total) * 100) : 0;
  const mediumPercent = total > 0 ? Math.round((mediumPriority / total) * 100) : 0;
  const highPercent = total > 0 ? Math.round((highPriority / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

      {/* Left Card: Completion Rate (40% width on large screens) */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
        <div>
          <h3 className="text-base font-bold text-gray-900">Completion rate</h3>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">Overview of done vs. pending tasks</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 my-4 justify-center lg:justify-start">
          {/* SVG Radial Gauge in professional Indigo */}
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#f3f4f6"
                strokeWidth="8.5"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#4f46e5"
                strokeWidth="8.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center select-none">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{completionRate}%</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Done</span>
            </div>
          </div>

          {/* Legend Details */}
          <div className="flex flex-col gap-3.5 flex-1 w-full">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-2 text-gray-600 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
                  Completed
                </span>
                <span className="font-bold text-gray-800">{completed} <span className="text-gray-400 font-normal">({completionRate}%)</span></span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#4f46e5] transition-all duration-1000 ease-out"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-2 text-gray-600 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                  Pending
                </span>
                <span className="font-bold text-gray-800">{pending} <span className="text-gray-400 font-normal">({total > 0 ? 100 - completionRate : 0}%)</span></span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gray-300 transition-all duration-1000 ease-out"
                  style={{ width: `${total > 0 ? 100 - completionRate : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs font-semibold text-gray-500">
          <span>Goal Status</span>
          <span className="text-gray-700">
            {completionRate === 100 ? 'All tasks done! 🎉' : `${completed} of ${total} tasks`}
          </span>
        </div>
      </div>

      {/* Right Card: Priority Breakdown (60% width on large screens) */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
        <div>
          <h3 className="text-base font-bold text-gray-900">Priority breakdown</h3>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">Distribution by urgency level</p>
        </div>

        {/* Single Horizontal Stacked Bar Chart */}
        <div className="my-6">
          <div className="w-full bg-gray-100 h-6 rounded-full overflow-hidden flex">
            {total > 0 ? (
              <>
                {highPriority > 0 && (
                  <div
                    style={{ width: `${highPercent}%` }}
                    className="bg-[#4f46e5] h-full transition-all duration-1000 ease-out"
                    title={`High: ${highPriority} tasks (${highPercent}%)`}
                  />
                )}
                {mediumPriority > 0 && (
                  <div
                    style={{ width: `${mediumPercent}%` }}
                    className="bg-[#818cf8] h-full transition-all duration-1000 ease-out"
                    title={`Medium: ${mediumPriority} tasks (${mediumPercent}%)`}
                  />
                )}
                {lowPriority > 0 && (
                  <div
                    style={{ width: `${lowPercent}%` }}
                    className="bg-[#c7d2fe] h-full transition-all duration-1000 ease-out"
                    title={`Low: ${lowPriority} tasks (${lowPercent}%)`}
                  />
                )}
              </>
            ) : (
              <div className="w-full bg-gray-150 h-full" />
            )}
          </div>

          {/* Inline Legend */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-2">
            <div className="flex flex-col text-xs">
              <span className="flex items-center gap-1.5 text-gray-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5] shrink-0"></span>
                High
              </span>
              <span className="font-bold text-gray-900 mt-1 pl-4">
                {highPriority} <span className="text-[10px] text-gray-400 font-normal">({highPercent}%)</span>
              </span>
            </div>
            <div className="flex flex-col text-xs border-l border-gray-100 pl-3">
              <span className="flex items-center gap-1.5 text-gray-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8] shrink-0"></span>
                Medium
              </span>
              <span className="font-bold text-gray-900 mt-1 pl-4">
                {mediumPriority} <span className="text-[10px] text-gray-400 font-normal">({mediumPercent}%)</span>
              </span>
            </div>
            <div className="flex flex-col text-xs border-l border-gray-100 pl-3">
              <span className="flex items-center gap-1.5 text-gray-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c7d2fe] shrink-0"></span>
                Low
              </span>
              <span className="font-bold text-gray-900 mt-1 pl-4">
                {lowPriority} <span className="text-[10px] text-gray-400 font-normal">({lowPercent}%)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs font-semibold text-gray-500">
          <span>Total urgency weight</span>
          <span className="text-gray-800">{total} active {total === 1 ? 'task' : 'tasks'}</span>
        </div>
      </div>

    </div>
  );
};

export default TaskChart;
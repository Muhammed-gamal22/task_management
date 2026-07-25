import React from 'react'

const FilterStatusTask = ({ statusFilter, setStatusFilter }) => {
    return (
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            {['All', 'To Do', 'In Progress', 'Done'].map((st) => (
                <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 text-white py-1.5 text-xs font-medium rounded-lg transition-all ${statusFilter === st
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                >
                    {st}
                </button>
            ))}
        </div>
    )
}

export default FilterStatusTask
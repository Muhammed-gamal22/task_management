import React from 'react'
import { Filter } from 'lucide-react'

const FilterPriorityTask = ({ priorityFilter, setPriorityFilter }) => {
    return (
        <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
    )
}

export default FilterPriorityTask
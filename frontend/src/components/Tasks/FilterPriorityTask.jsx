import React from 'react'
import { Filter } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const FilterPriorityTask = ({ priorityFilter, setPriorityFilter }) => {
    return (
        <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium rounded-xl px-3 py-2 h-auto text-slate-700 dark:text-slate-200 focus:outline-none min-w-[120px]">
                    <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1 z-50">
                    <SelectItem value="All" className="text-xs font-medium cursor-pointer rounded-lg">All Priorities</SelectItem>
                    <SelectItem value="High" className="text-xs font-medium cursor-pointer rounded-lg">High</SelectItem>
                    <SelectItem value="Medium" className="text-xs font-medium cursor-pointer rounded-lg">Medium</SelectItem>
                    <SelectItem value="Low" className="text-xs font-medium cursor-pointer rounded-lg">Low</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterPriorityTask
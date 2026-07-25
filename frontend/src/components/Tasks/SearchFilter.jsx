import { Search } from "lucide-react";

import React from 'react'

const SearchFilter = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-slate-200"
            />
        </div>
    )
}

export default SearchFilter
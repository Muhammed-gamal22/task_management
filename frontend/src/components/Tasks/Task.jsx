import React from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, PlayCircle, Edit3, Trash2 } from 'lucide-react';
import { format, isBefore, startOfDay } from 'date-fns';

const priorityConfig = {
    High: {
        bg: 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-800/40',
        dot: 'bg-red-500',
    },
    Medium: {
        bg: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-800/40',
        dot: 'bg-amber-500',
    },
    Low: {
        bg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40',
        dot: 'bg-emerald-500',
    },
};

const statusConfig = {
    'Done': {
        bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        icon: CheckCircle2,
        iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    'In Progress': {
        bg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        icon: PlayCircle,
        iconColor: 'text-blue-600 dark:text-blue-400',
    },
    'To Do': {
        bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        icon: Clock,
        iconColor: 'text-slate-500 dark:text-slate-400',
    },
};

const Task = ({ task, onEdit, onDelete, onStatusChange }) => {
    if (!task) return null;

    const { _id, title, description, status = 'To Do', priority = 'Medium', due_date } = task;

    const priorityStyle = priorityConfig[priority] || priorityConfig.Medium;
    const statusStyle = statusConfig[status] || statusConfig['To Do'];
    const StatusIcon = statusStyle.icon;

    const formattedDate = due_date ? format(new Date(due_date), 'MMM d, yyyy') : 'No due date';
    const isOverdue = due_date && status !== 'Done' && isBefore(new Date(due_date), startOfDay(new Date()));

    return (
        <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Main Info */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        {/* Status Badge Dropdown / Toggle */}
                        <div className="relative inline-block">
                            <select
                                value={status}
                                onChange={(e) => onStatusChange?.(_id, e.target.value)}
                                className={`appearance-none cursor-pointer text-xs font-semibold px-3 py-1 pr-7 rounded-full border ${statusStyle.bg} transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20`}
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                            <StatusIcon className={`w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${statusStyle.iconColor}`} />
                        </div>

                        {/* Priority Badge */}
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${priorityStyle.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dot}`} />
                            {priority}
                        </span>

                        {/* Overdue Warning */}
                        {isOverdue && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                                <AlertCircle className="w-3 h-3" />
                                Overdue
                            </span>
                        )}
                    </div>

                    {/* Task Title */}
                    <h3 className={`text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors ${status === 'Done' ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                        {title}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    )}

                    {/* Meta Info */}
                    <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span className={isOverdue ? 'font-semibold text-rose-600 dark:text-rose-400' : ''}>
                                {formattedDate}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 self-end sm:self-start pt-2 sm:pt-0">
                    <button
                        onClick={() => onEdit?.(task)}
                        title="Edit Task"
                        className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete?.(_id)}
                        title="Delete Task"
                        className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;

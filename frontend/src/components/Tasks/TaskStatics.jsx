
import { CheckCircle2, Clock, ListTodo, PlayCircle } from "lucide-react"

const TaskStatics = ({ tasksList }) => {
    const totalCount = tasksList.length;
    const todoCount = tasksList.filter(t => t.status === 'To Do').length;
    const inProgressCount = tasksList.filter(t => t.status === 'In Progress').length;
    const doneCount = tasksList.filter(t => t.status === 'Done').length;
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Tasks</span>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                        <ListTodo className="w-4 h-4" />
                    </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">{totalCount}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">To Do</span>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                        <Clock className="w-4 h-4" />
                    </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">{todoCount}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">In Progress</span>
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg text-blue-600 dark:text-blue-400">
                        <PlayCircle className="w-4 h-4" />
                    </div>
                </div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{inProgressCount}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Completed</span>
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                </div>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{doneCount}</p>
            </div>
        </div>
    )
}

export default TaskStatics
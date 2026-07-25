import {
    Plus,
    ListTodo,
} from 'lucide-react';
import CustomButton from "@/customs/CustomButton"

const TaskHeader = ({ openCreateModal }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2.5">
                    <ListTodo className="w-7 h-7 text-primary" />
                    Task Management
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Organize, track, and manage your tasks efficiently.
                </p>
            </div>
            <CustomButton onClick={openCreateModal}
                className="inline-flex text-white sha cursor-pointer items-center justify-center gap-2 bg-white hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 active:scale-95">
                <Plus className="w-4 h-4" />
                Create New Task
            </CustomButton>

        </div>
    )
}

export default TaskHeader
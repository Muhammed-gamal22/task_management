import { Plus, ListTodo, LogOut } from 'lucide-react';
import CustomButton from "@/customs/CustomButton";
import { useTokenStore } from "@/store/token-store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TaskHeader = ({ openCreateModal }) => {
    const { setToken } = useTokenStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken("");
        localStorage.removeItem("token");
        toast.info("Logged out successfully");
        navigate("/login");
    };

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
            <div className="flex items-center gap-3">
                <CustomButton onClick={openCreateModal}
                    className="inline-flex text-white shadow cursor-pointer items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 active:scale-95">
                    <Plus className="w-4 h-4" />
                    Create New Task
                </CustomButton>
                <button
                    onClick={handleLogout}
                    title="Log Out"
                    className="inline-flex items-center justify-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/50 text-sm font-semibold px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default TaskHeader;
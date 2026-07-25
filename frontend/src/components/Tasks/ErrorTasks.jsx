
import {
    AlertCircle
} from 'lucide-react';
const ErrorTasks = ({ error }) => {
    return (
        <div className="bg-rose-50 dark:bg-rose-950/20 p-8 rounded-2xl border border-rose-200 dark:border-rose-800/40 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-rose-600 dark:text-rose-400 mx-auto" />
            <h3 className="text-base font-semibold text-rose-900 dark:text-rose-200">Error Loading Tasks</h3>
            <p className="text-sm text-rose-600 dark:text-rose-400">
                {error?.response?.data?.message || error?.message || 'Could not load tasks from server.'}
            </p>
        </div>
    )
}

export default ErrorTasks
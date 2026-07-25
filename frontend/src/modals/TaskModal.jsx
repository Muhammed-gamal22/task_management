import React from 'react'
import { useForm } from 'react-hook-form';
import { useTaskStore } from '../store/modals-store';
import { toast } from 'react-toastify';
import { postData, patchData } from '../services/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, X } from 'lucide-react';
import CustomButton from '@/customs/CustomButton';
const TaskModal = ({ register, handleSubmit, errors, reset, editingTask, setEditingTask }) => {
    const { setIsTaskModalOpen, setIsEdit } = useTaskStore()
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: (newTask) => postData('/tasks', newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task created successfully!');
            setIsTaskModalOpen(false);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || 'Failed to create task');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, updatedFields }) => patchData(`/tasks/${id}`, updatedFields),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task updated successfully!');
            setIsTaskModalOpen(false);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || 'Failed to update task');
        }
    });

    const onSubmit = (formData) => {
        if (editingTask) {
            updateMutation.mutate({ id: editingTask._id, updatedFields: formData });
        } else {
            createMutation.mutate(formData);
        }
    };
    const closeModal = () => {
        setIsTaskModalOpen(false);
        setEditingTask(null);
        reset();
    };
    return (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {editingTask ? 'Edit Task' : 'Create New Task'}
                    </h3>
                    <button
                        onClick={() => { closeModal(); }}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            Task Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter task title"
                            {...register('title', { required: 'Task title is required' })}
                            className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-slate-100"
                        />
                        {errors.title && (
                            <p className="text-xs text-rose-500 mt-1">{errors.title.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            Description <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Provide detailed description for the task..."
                            {...register('description', { required: 'Task description is required' })}
                            className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-slate-100 resize-none"
                        />
                        {errors.description && (
                            <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                Status <span className="text-rose-500">*</span>
                            </label>
                            <select
                                {...register('status', { required: 'Task status is required' })}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none"
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                            {errors.status && (
                                <p className="text-xs text-rose-500 mt-1">{errors.status.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                Priority <span className="text-rose-500">*</span>
                            </label>
                            <select
                                {...register('priority', { required: 'Task priority is required' })}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            {errors.priority && (
                                <p className="text-xs text-rose-500 mt-1">{errors.priority.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                Due Date <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="date"
                                {...register('due_date', { required: 'Due date is required' })}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none"
                            />
                            {errors.due_date && (
                                <p className="text-xs text-rose-500 mt-1">{errors.due_date.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">

                        <CustomButton
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 cursor-pointer  text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                            Cancel
                        </CustomButton>

                        <CustomButton
                            type="submit"
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className="inline-flex cursor-pointer items-center gap-2 bg-white text-black hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95 disabled:opacity-50"
                        >
                            {(createMutation.isPending || updateMutation.isPending) && (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            )}
                            {editingTask ? 'Save Changes' : 'Create Task'}
                        </CustomButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModal
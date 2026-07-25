import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useTaskStore } from '../store/modals-store';
import { toast } from 'react-toastify';
import { postData, patchData } from '../services/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, X } from 'lucide-react';
import CustomButton from '@/customs/CustomButton';
import CustomInput from '@/customs/CustomInput';
import SelectBox from '@/customs/SelectBox';

const TaskModal = ({ methods, editingTask, setEditingTask }) => {
    const { setIsTaskModalOpen } = useTaskStore();
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
        if (methods?.reset) {
            methods.reset();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {editingTask ? 'Edit Task' : 'Create New Task'}
                    </h3>
                    <button
                        onClick={closeModal}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6 space-y-4">
                        <CustomInput
                            name="title"
                            label="Task Title"
                            placeholder="Enter task title"
                            rules={{ required: 'Task title is required' }}
                        />
                        <CustomInput
                            name="description"
                            label="Description"
                            placeholder="Provide detailed description for the task..."
                            type="textarea"
                            rows={3}
                            rules={{ required: 'Task description is required' }}
                        />


                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <SelectBox
                                name="status"
                                label="Status"
                                placeholder="Select Status"
                                options={[
                                    { value: 'To Do', label: 'To Do' },
                                    { value: 'In Progress', label: 'In Progress' },
                                    { value: 'Done', label: 'Done' },
                                ]}
                                rules={{ required: 'Status is required' }}
                            />

                            <SelectBox
                                name="priority"
                                label="Priority"
                                placeholder="Select Priority"
                                options={[
                                    { value: 'Low', label: 'Low' },
                                    { value: 'Medium', label: 'Medium' },
                                    { value: 'High', label: 'High' },
                                ]}
                                rules={{ required: 'Priority is required' }}
                            />

                            <CustomInput
                                name="due_date"
                                label="Due Date"
                                placeholder="Select Due Date"
                                type="date"
                                rules={{
                                    required: 'Due date is required',
                                    validate: (value) => {
                                        if (!value) return true;
                                        const selected = new Date(value);
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        return selected >= today || 'Due date cannot be in the past';
                                    }
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <CustomButton
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 cursor-pointer text-xs font-semibold text-white dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            >
                                Cancel
                            </CustomButton>

                            <CustomButton
                                type="submit"
                                disabled={createMutation.isPending || updateMutation.isPending}
                                className="inline-flex cursor-pointer items-center gap-2 bg-white  text-black-foreground text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95 disabled:opacity-50"
                            >
                                {(createMutation.isPending || updateMutation.isPending) && (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                )}
                                {editingTask ? 'Save Changes' : 'Create Task'}
                            </CustomButton>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default TaskModal;

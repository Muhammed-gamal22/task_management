import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getData, patchData, deleteData } from '@/services/services';
import Task from './Task';
import { toast } from 'react-toastify';
import { useTaskStore } from '@/store/modals-store';
import TaskModal from '@/modals/TaskModal';
import FilterPriorityTask from './FilterPriorityTask';
import LoadingTasks from './LoadingTasks';
import ErrorTasks from './ErrorTasks';
import { useForm } from 'react-hook-form';
import TaskHeader from './TaskHeader';
import TaskStatics from './TaskStatics';
import SearchFilter from './SearchFilter';
import FilterStatusTask from './FilterStatusTask';
import EmptyTasks from './EmptyTasks';

const Tasks = () => {
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [editingTask, setEditingTask] = useState(null);
    const { setIsEdit, setIsTaskModalOpen, isOpenTaskModal } = useTaskStore();

    const methods = useForm({
        defaultValues: {
            title: '',
            description: '',
            status: 'To Do',
            priority: 'Medium',
            due_date: new Date().toISOString().split('T')[0],
        }
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getData('/tasks'),
    });

    const tasksList = data?.tasks || [];

    const statusUpdateMutation = useMutation({
        mutationFn: ({ id, status }) => patchData(`/tasks/${id}`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task status updated');
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || 'Failed to update status');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteData(`/tasks/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task deleted successfully');
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || 'Failed to delete task');
        }
    });

    const openCreateModal = () => {
        setIsEdit(false);
        methods.reset({
            title: '',
            description: '',
            status: 'To Do',
            priority: 'Medium',
            due_date: new Date().toISOString().split('T')[0],
        });
        setIsTaskModalOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        methods.setValue('title', task.title);
        methods.setValue('description', task.description || '');
        methods.setValue('status', task.status || 'To Do');
        methods.setValue('priority', task.priority || 'Medium');
        methods.setValue('due_date', task.due_date ? task.due_date.split('T')[0] : new Date().toISOString().split('T')[0]);
        setIsTaskModalOpen(true);
    };

    const handleStatusChange = (id, newStatus) => {
        statusUpdateMutation.mutate({ id, status: newStatus });
    };

    const handleDeleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteMutation.mutate(id);
        }
    };

    const filteredTasks = tasksList.filter(t => {
        const matchesSearch = t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <TaskHeader openCreateModal={openCreateModal} />

                <TaskStatics tasksList={tasksList} />

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                    <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3">
                        <FilterStatusTask statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
                        <FilterPriorityTask priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} />
                    </div>
                </div>

                {isLoading ? (
                    <LoadingTasks />
                ) : isError ? (
                    <ErrorTasks error={error} />
                ) : filteredTasks.length === 0 ? (
                    <EmptyTasks openCreateModal={openCreateModal} searchQuery={searchQuery} statusFilter={statusFilter} priorityFilter={priorityFilter} />
                ) : (
                    <div className="space-y-3">
                        {filteredTasks.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                onEdit={openEditModal}
                                onDelete={handleDeleteTask}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                )}
            </div>

            {isOpenTaskModal && (
                <TaskModal
                    methods={methods}
                    editingTask={editingTask}
                    setEditingTask={setEditingTask}
                />
            )}
        </div>
    );
};

export default Tasks;


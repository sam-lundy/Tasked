import { useState, useEffect } from 'react';
import axios from 'axios';

const MyTasks = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tasks', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.error("Error fetching tasks:", error);
        });
    }, []); 


    const handleAddTask = () => {
        if (task.trim()) {  // ensure task is not just spaces
            axios.post('http://localhost:5000/api/save_task', {
                title: task
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // After successful post to backend, update the local state
                setTasks(prevTasks => [...prevTasks, { title: response.data.task.title, completed: false, id: response.data.task.id }]);
                setTask('');  // clear input
            })
            .catch(error => {
                console.error("Error adding task:", error);
            });
        }
    };
    


    const handleCompleteTask = (e, index) => {
        e.stopPropagation();
        console.log("Completing task at index:", index);
        const taskId = tasks[index].id;
        console.log("Task ID:", taskId);
        axios.put(`/api/tasks/${taskId}`, { completed: true }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            const newTasks = [...tasks];
            newTasks[index].completed = true;
            setTasks(newTasks);
        })
        .catch(error => {
            console.error("Error completing task:", error);
        });
    };
    

    const handleDeleteTask = (index) => {
        const taskId = tasks[index].id;
        
        axios.delete(`/api/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            const newTasks = tasks.filter(task => task.id !== taskId);
            setTasks(newTasks);
        })
        .catch(error => {
            console.error("Error deleting task:", error);
        });
    };
    

    const handleUnDeleteTask = (index) => {
        const taskId = tasks[index].id;
        axios.put(`/api/tasks/${taskId}`, { completed: false }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            const newTasks = [...tasks];
            newTasks[index].completed = false;
            setTasks(newTasks);
        })
        .catch(error => {
            console.error("Error undeleting task:", error);
        });
    };
    


    return (
        <div className="flex items-start justify-center h-screen mt-20">
            <div className="bg-white p-8 rounded-lg shadow-md w-1/2 ">
                <div className="mb-4">
                    <input 
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter your task"
                        className="border rounded p-2 w-full"
                    />
                    <div className="flex justify-center">
                        <button onClick={handleAddTask} className="mt-8 bg-indigo-800 text-white p-2 rounded w-1/4">
                            Add Task
                        </button>
                    </div>
                </div>

                <h2 className="text-lg font-bold mb-2">Active Tasks</h2>
                <ul className="space-y-2 mb-4">
                    {tasks.filter(t => !t.completed).map((t, index) => (
                        <li key={index} className="flex justify-between items-center border-b pb-2">
                            <span>{t.title}</span>
                            <div>
                                <button 
                                    onClick={(e) => handleCompleteTask(e, index)} 
                                    className="text-green-500 hover:text-green-700 mr-2"
                                >
                                    Complete
                                </button>
                                <button 
                                    onClick={() => handleDeleteTask(index)} 
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <h2 className="text-lg font-bold mb-2">Completed Tasks</h2>
                <ul className="space-y-2 mb-4">
                    {tasks.filter(t => t.completed).map((t, index) => (
                        <li key={t.id} className="flex justify-between items-center border-b pb-2">
                            <span>{t.title}</span>
                            <button 
                                onClick={() => handleUnDeleteTask(index)} 
                                className="text-blue-500 hover:text-indigo-700"
                            >
                                Mark Active
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export default MyTasks;

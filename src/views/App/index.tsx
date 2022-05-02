import React, { useState } from "react";

import { useToDoStore } from "../../data/stores/useTODOStore";
import { InputTask } from "../components/InputTask";
import { TaskBlock } from "../components/TaskBlock";
import { ModalWindow } from "../components/ModalWindow";

import styles from './index.module.styl'


interface SelectedTaskObject {
    id: string,
    title: string,
    createdAt: number
}

export const App: React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask,
        createSubTask,
        removeSubTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
        state.createSubTask,
        state.removeSubTask,
    ])
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState('')
    const [selectedTaskTitle, setSelectedTaskTitle] = useState('')
    const [selectedTaskCreatedAt, setSelectedTaskCreatedAt] = useState(Number)

    const selectTask = (value: SelectedTaskObject) => {
        setSelectedTaskId(value.id)
        setSelectedTaskTitle(value.title)
        setSelectedTaskCreatedAt(value.createdAt)
    }

    console.log(tasks)

    return (
        <>
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To do react app</h1>
            <section className={styles.articleSection}>
                <InputTask 
                    onAdd={(title) => {
                        if (title) {
                            createTask(title)
                        }
                    }}
                />
            </section>
            <hr />
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleText}>There is no one task.</p>
                )}
                {tasks.map(task => (
                    <TaskBlock
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        createdAt={task.createdAt}
                        subTasks={task.subTask}
                        modalOpen={isModalOpen}
                        onDone={removeTask}
                        onEdited={updateTask}
                        onRemoved={removeTask}
                        onSelect={selectTask}
                        setModal={setModalOpen}
                        onRemovedSubTask={removeSubTask}
                    />
                ))}
            </section>
        </article>
        {isModalOpen &&  
        <ModalWindow
            id={selectedTaskId}
            title={selectedTaskTitle}
            createdAt={selectedTaskCreatedAt}
            addSubTask={createSubTask}
            isModalOpen={setModalOpen}
        />} 
        </>
    )
}
import React, { useState, useRef, useEffect } from "react";
import { SubTask } from '../subTask'

import styles from './index.module.styl'


interface TaskBlockProps {
    id: string,
    title: string,
    createdAt: number,
    modalOpen: boolean,
    subTasks: SubTask[],
    setModal: (modalOpen: boolean) => void;
    onSelect: (value: {id: string, title: string, createdAt: number}) => void;
    onRemovedSubTask: (id: string, parentId: string) => void;
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemoved: (id: string) => void;
}

interface SubTask {
    id: string;
    title: string;
    description: string;
    createdAt: number;
}


export const TaskBlock: React.FC<TaskBlockProps> = ({
    id,
    title,
    createdAt,
    modalOpen,
    subTasks,
    onRemovedSubTask,
    onSelect,
    setModal,
    onDone,
    onEdited,
    onRemoved,

}) => {
  
    const [checked, setChecked] = useState(false);
    const [checkedTask, setCheckedTask] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editedValue, setValue] = useState(title);

    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode, subTasks])

    const normalizedDate = new Date(createdAt).toLocaleTimeString()

    return (
        <>
        <div className={styles.taskBlock} >
            <label className={styles.taskBlockLabel}>
                <input 
                    type="checkbox" 
                    disabled={isEditMode}
                    checked={checked}
                    className={styles.taskBlockCheckbox}
                    onChange={(e) => {
                        setCheckedTask(e.target.checked)
                        setChecked(e.target.checked);
                        if (e.target.checked) {
                            // onDone(id)
                        }
                    }}
                />
                <div className={`${styles.taskBlockCustomCheckbox} ${checked ? styles.taskBlockCustomCheckboxChecked : ''}`}></div>
                </label>
                {isEditMode ? (
                    <input
                        value={editedValue}
                        ref={editTitleInputRef}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter') {
                                onEdited(id, editedValue)
                                setEditMode(false)
                            }
                        }}
                        className={styles.taskBlockEditInput}
                      />
                ) : (
                    <h3
                        className={`${styles.taskBlockTitle} ${checkedTask ? styles.taskBlockTitleChecked : ''}`}
                        onClick={()=>{
                            if (!checkedTask) { 
                                setModal((modalOpen = !modalOpen))
                                onSelect({id: id, title: title, createdAt: createdAt})
                            }
                        }}
                    >{title}</h3>
                )}
            <div className={styles.taskBlockCreated}>created: {normalizedDate}</div>
            { isEditMode ? (
                <button 
                aria-label="Save"
                className={styles.taskBlockSave}
                onClick={() => {
                    onEdited(id, editedValue)
                    setEditMode(false)
                }}
            />
            ) : (
            <button 
                aria-label="Edit"
                disabled={checkedTask}
                className={styles.taskBlockEdit}
                onClick={() => {
                    if(!checkedTask) setEditMode(true)
                }}
            />
            )}
            <button 
                aria-label="Remove"
                className={styles.taskBlockRemove}
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemoved(id)
                    }
                }}
            />
        </div>
        {subTasks.map(subTask => (
            < SubTask 
                key={subTask.id}
                id={subTask.id}
                title={subTask.title}
                description={subTask.description}
                parentId={id}
                createdAt={subTask.createdAt}
                checkedAllList={checkedTask}
                onRemovedSubTask={onRemovedSubTask}
            />
        ))}
        </>
    )
}  
import React, { useState, useEffect } from "react";

import styles from './index.module.styl'

interface SubTask {
    id: string,
    title: string,
    createdAt: number,
    description: string,
    parentId: string,
    checkedAllList: boolean,
    onRemovedSubTask: (id: string, parentId: string) => void;
}

export const SubTask: React.FC<SubTask> = ({
    id,
    title,
    description,
    createdAt,
    parentId,
    checkedAllList,
    onRemovedSubTask
}) => {
  
    const [checked, setChecked] = useState(false);
    const [checkedTask, setCheckedTask] = useState(false);
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setCheckedTask(checkedAllList)
        setChecked(checkedAllList)
    }, [checkedAllList])

    const normalizedDate = new Date(createdAt).toLocaleTimeString()

    return (
        <div className={styles.subTaskBlock} >
            <label className={styles.subTaskBlockLabel}>
                <input 
                    type="checkbox" 
                    checked={checked}
                    className={styles.subTaskBlockCheckbox}
                    onChange={(e) => {
                        setCheckedTask(e.target.checked)
                        setChecked(e.target.checked);
                        if (e.target.checked) {
                            // onDone(id)
                        }
                    }}
                />
                <div className={`${styles.subTaskBlockCustomCheckbox} ${checked ? styles.subTaskBlockCustomCheckboxChecked : ''}`}></div>
                </label>
            <h3
                className={`${styles.subTaskBlockTitle} ${checkedTask ? styles.subTaskBlockTitleChecked : ''}`}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >{title}</h3>
            {isShown && (<div className={styles.subTaskBlockDescription}>{description}</div>)}
            <div className={styles.subTaskBlockCreated}>created: {normalizedDate}</div>
            <button 
                aria-label="Remove"
                className={styles.subTaskBlockRemove}
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemovedSubTask(id, parentId)
                    }
                }}
            />
        </div>
    )
}  
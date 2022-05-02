import React, { useCallback, useState } from "react";

import styles from './index.module.styl'

interface InputTaskProps {
    onAdd: (title: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    onAdd,
}) => {
    const [inputValue, setInputValue] = useState('')
    const addTask = useCallback(() => {
        onAdd(inputValue)
        setInputValue('');
    }, [inputValue])

    return (
        <div className={styles.inputTask}>
            <input
             type="text" 
             className={styles.inputTaskInput} 
             value={inputValue}
             placeholder="place some text"
             onChange={(e) => {
                 setInputValue(e.target.value);
             }}
             onKeyDown={(e) => {
                 if(e.key === 'Enter') {
                    addTask();
                 }
             }}
             />
             <button 
                onClick={addTask}
                aria-label="Add"
                className={styles.inputTaskButton} 
             />
        </div>
    )
}  
import React, {useState} from "react";

import styles from './index.module.styl'

interface ModalWindowProps {
    id: string,
    title: string,
    createdAt: number,
    isModalOpen: (boolean: boolean) => void,
    addSubTask: (title: string, parentId: string, description: string) => void;
}


export const ModalWindow: React.FC<ModalWindowProps> = ({
    id,
    title,
    createdAt,
    isModalOpen,
    addSubTask
}) => {

    const [inputValue, setInputValue] = useState('')
    const [textareaValue, setTextareaValue] = useState('')

    return (
        <>
            <div className={styles.modalWrapper} onClick={() => {isModalOpen(false)}}></div>
            <div className={styles.modalWindow}>
                <button className={styles.modalWindowCloseBtn} onClick={() => {isModalOpen(false)}}></button>
                <h3 className={styles.modalHeading}>Task: "{title}" , id: {id}</h3>
                <h4>Created at: {new Date(createdAt).toLocaleDateString()}</h4>
                <div className={styles.modalWindowContent}>
                    <div className={styles.modalWindowAddBlock}>
                        <div className={styles.modalWindowAddBlockItem}>
                            <div>Subtask title</div>
                            <input
                                type="text"
                                className={styles.modalWindowInput}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value)
                                }}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') {
                                        // addSubTask();
                                    }
                                }}
                            /></div>
                        <div className={styles.modalWindowAddBlockItem}>
                            <div>Subtask description</div>
                            <textarea
                                className={styles.modalWindowTextArea}
                                value={textareaValue}
                                onChange={(e) => {
                                    setTextareaValue(e.target.value)
                                }}
                            ></textarea>
                        </div>
                    </div>
                <button
                    className={styles.modalWindowButton}
                    onClick={() => {
                        addSubTask(inputValue, id, textareaValue)
                        isModalOpen(false)
                    }}
                >Add subtask</button>
                </div>
            </div>
        </>
    )
}
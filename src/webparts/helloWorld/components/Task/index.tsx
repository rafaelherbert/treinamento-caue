import * as React from 'react';
import { ITask } from '../../types/Interface';
import { AiOutlineClose } from 'react-icons/ai';
import * as S from './style';
import { useRef, useState } from 'react';

interface ITaskProps {
  show: boolean;
  task: ITask;
  close: () => Promise<void>;
  edit: boolean;
  setEditMode: (v: boolean) => void;
  toggleDone: (t: ITask) => Promise<void>;
  updateTask: (t: ITask) => Promise<void>;
}

export const Task = (
  { show, task, close, edit, setEditMode, toggleDone, updateTask }
    : ITaskProps) => {

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDone, setTaskDone] = useState(false);
  const containerRef = useRef(null);

  const startEdit = () => {
    setTaskTitle(task.Title);
    setTaskDescription(task.Description);
    setTaskDone(task.Done);
    setEditMode(true);
  }

  const handleSave = async () => {
    await updateTask({
      ...task,
      Title: taskTitle,
      Description: taskDescription,
      Done: taskDone,
    });
    setEditMode(false);
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target === containerRef.current) {
      close();
    }
  }


  return (
    <S.Container
      show={show}
      onClick={(e) => handleOutsideClick(e)}
      ref={containerRef}
    >
      <S.Wrapper>
        <S.ContentContainer>
          <S.CheckboxWrapper>
            {edit ?
              <S.Checkbox
                checked={taskDone}
                onClick={() => setTaskDone(!taskDone)}
              />
              :
              <S.Checkbox
                checked={task.Done}
                onClick={() => toggleDone(task)}
              />
            }

          </S.CheckboxWrapper>

          <S.TextContentContainer>

            <S.TitleContainer>
              {edit
                ?
                <S.TaskTitleEdit
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.currentTarget.value)}
                />
                :
                <S.TaskTitle>
                  {task.Title}
                </S.TaskTitle>
              }


              <S.Close onClick={close}>
                <AiOutlineClose />
              </S.Close>
            </S.TitleContainer>


            {edit ?
              <S.TaskDescriptionEdit
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.currentTarget.value)}
              />
              :
              <S.Description>
                {task.Description}
              </S.Description>
            }


            <S.ButtonsContainer>
              {edit
                ?
                <>
                  <S.Button onClick={handleSave}>
                    Salvar
                  </S.Button>

                  <S.Button
                    onClick={() => setEditMode(false)}
                    light
                  >
                    Cancelar
                  </S.Button>
                </>

                :
                <S.Button onClick={startEdit}>
                  Editar
                </S.Button>
              }

            </S.ButtonsContainer>
          </S.TextContentContainer>
        </S.ContentContainer>
      </S.Wrapper>
    </S.Container>
  )
}

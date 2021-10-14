import * as React from 'react';
import { AiOutlinePlus, AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import * as S from './style';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from '@pnp/sp/presets/all';
import { AddTask } from '../AddTask';
import { ITask } from '../../types/Interface';
import { Task } from '../Task';
import { GlobalStyle } from '../../styles/global';

const Tasklist = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [expandedTask, setExpandedTask] = useState<ITask>({} as ITask);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const items = await sp.web.lists.getByTitle("Tarefas").items.get<ITask[]>();
    setTasks(items);
  };

  const handleToggleDone = async (task: ITask) => {
    try {
      await sp.web.lists.getByTitle("Tarefas")
        .items.getById(task.Id)
        .update({
          Done: !task.Done
        });
    } catch (err) {
      console.log(err);
    } finally {
      setTasks(prevState => (
        prevState.map(i => i.Id === task.Id ? {
          ...task,
          Done: !task.Done
        } : i)
      ));

      setExpandedTask({
        ...expandedTask,
        Done: !expandedTask.Done
      });
    }
  }

  const handleToggleAddTask = () => {
    setShowAddTask(prevState => !prevState);
  }

  const handleExpandTask = (task: ITask) => {
    setExpandedTask(task);
    setShowDetails(true);
  }

  const handleDeleteTask = async (task: ITask) => {
    try {
      await sp.web.lists.getByTitle("Tarefas")
        .items.getById(task.Id)
        .delete();

    } catch (err) {
      console.log(err);
    } finally {
      setTasks(prevState =>
        prevState.filter(i => i.Id !== task.Id)
      );
    }
  }

  return (
    <S.Container>
      <GlobalStyle />
      <S.TasklistTitleContainer>
        <h2>Lista de tarefas</h2>

        <S.AddTaskBtn onClick={handleToggleAddTask}>
          <AiOutlinePlus />
        </S.AddTaskBtn>
      </S.TasklistTitleContainer>

      <S.ContainerTasks>

        {tasks.map(task => {
          return (
            <S.Task>

              <S.TitleContainer>
                <S.Checkbox
                  checked={task.Done}
                  onClick={() => handleToggleDone(task)}
                />
                <S.TaskTitle
                  onClick={() => handleExpandTask(task)}
                >
                  {task.Title}
                </S.TaskTitle>
              </S.TitleContainer>

              <S.TaskOptionsContainer>
                <S.TaskOption>
                  <AiOutlineEye onClick={() => handleExpandTask(task)} />
                </S.TaskOption>

                <S.TaskOption>
                  <AiOutlineEdit />
                </S.TaskOption>

                <S.TaskOption>
                  <AiOutlineDelete onClick={() => handleDeleteTask(task)} />
                </S.TaskOption>
              </S.TaskOptionsContainer>

            </S.Task>
          )
        })}

      </S.ContainerTasks>


      <AddTask show={showAddTask} />
      <Task
        show={showDetails}
        task={expandedTask}
        close={() => setShowDetails(false)}
        edit={editMode}
        setEditMode={(v: boolean) => setEditMode(v)}
        toggleDone={(t: ITask) => handleToggleDone(t)}
      />
    </S.Container>
  );
}

export default Tasklist;

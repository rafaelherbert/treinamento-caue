import * as React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import * as S from './style';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from '@pnp/sp/presets/all';
import { AddTask } from '../AddTask';

interface ITask {
  Id: number;
  Title: string;
  Done: boolean;
  Description: string;
}

const HelloWorld = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [expandedTask, setExpandedTask] = useState<ITask>({} as ITask);
  const [showAddTask, setShowAddTask] = useState(false);

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

    }
  }

  const handleToggleAddTask = () => {
    setShowAddTask(prevState => !prevState);
  }

  const handleExpandTask = (task: ITask) => {
    expandedTask === task
      ? setExpandedTask({} as ITask)
      : setExpandedTask(task);
  }

  return (
    <S.Container>
      <h2>Lista de tarefass</h2>

      <S.ContainerTasks>

        {tasks.map(task => {
          return (
            <S.Task>

              <S.Title>
                <input
                  type="checkbox"
                  checked={task.Done}
                  onClick={() => handleToggleDone(task)}
                />
                <p
                  onClick={() => handleExpandTask(task)}
                >
                  {task.Title}
                </p>
              </S.Title>

              <S.Description
                show={task === expandedTask}
              >
                {task.Description}
              </S.Description>

            </S.Task>
          )
        })}

      </S.ContainerTasks>

      <S.AddTaskBtn onClick={handleToggleAddTask}>
        <AiOutlinePlus />
      </S.AddTaskBtn>

      <AddTask show={showAddTask} />
    </S.Container>
  );
}

export default HelloWorld;

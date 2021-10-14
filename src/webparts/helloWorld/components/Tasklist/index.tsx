import * as React from 'react';
import { AiOutlinePlus, AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import * as S from './style';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PagedItemCollection, sp } from '@pnp/sp/presets/all';
import { AddTask } from '../AddTask';
import { ICreateTask, ITask } from '../../types/Interface';
import { Task } from '../Task';
import { GlobalStyle } from '../../styles/global';
import { sleep } from '../../utils/sleep';
import { Modal } from '../Modal';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { TasklistProps } from '../../HelloWorldWebPart';

const Tasklist = ({ context }: TasklistProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [expandedTask, setExpandedTask] = useState<ITask>({} as ITask);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const items = await sp.web.lists.getByTitle("Tarefas").items.get<ITask[]>();
    const page = await sp.web.lists.getByTitle("Tarefas").items.top(10)
      .getPaged<PagedItemCollection<ITask[]>>();
    console.log(page.results);
    console.log(context.pageContext.legacyPageContext["userId"]);
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

  const handleUpdateTask = async (updatedTask: ITask) => {
    try {
      await sp.web.lists.getByTitle("Tarefas")
        .items.getById(updatedTask.Id)
        .update(updatedTask);
    } catch (err) {
      console.log(err);
    } finally {
      setTasks(prevState => (
        prevState.map(i => i.Id === updatedTask.Id ? updatedTask : i)
      ));

      setExpandedTask(updatedTask);
    }
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

  const handleCloseTaskModal = async () => {
    setShowDetails(false);
    await sleep(1000);
    setEditMode(false);
  }

  const handleCloseAddTaskModal = async () => {
    setShowAddTask(false);
    await sleep(1000);
  }

  // const handleOpenForEdit = (task: ITask) => {
  //   setExpandedTask(task);
  //   setEditMode(true);
  //   setShowDetails(true);
  // }

  const handleAddTask = async (task: ICreateTask) => {
    try {
      const { data } = await sp.web.lists.getByTitle("Tarefas")
        .items.add({
          Title: task.Title,
          Description: task.Description,
          Done: false
        });

      setTasks(prevState => [
        ...prevState, {
          Id: data.Id,
          Title: data.Title,
          Description: data.Description,
          Done: data.Done,
        }
      ]);
    } catch (err) {
      console.log(err);
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

                {/* <S.TaskOption onClick={() => handleOpenForEdit(task)}>
                  <AiOutlineEdit />
                </S.TaskOption> */}

                <S.TaskOption>
                  <AiOutlineDelete onClick={() => handleDeleteTask(task)} />
                </S.TaskOption>
              </S.TaskOptionsContainer>

            </S.Task>
          )
        })}

      </S.ContainerTasks>


      <AddTask
        show={showAddTask}
        close={handleCloseAddTaskModal}
        addTask={(t: ITask) => handleAddTask(t)}
      />


      <Task
        show={showDetails}
        task={expandedTask}
        close={handleCloseTaskModal}
        edit={editMode}
        setEditMode={(v: boolean) => setEditMode(v)}
        toggleDone={(t: ITask) => handleToggleDone(t)}
        updateTask={handleUpdateTask}
      />

    </S.Container>
  );
}

export default Tasklist;

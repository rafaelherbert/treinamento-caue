import * as React from 'react';
import { AiOutlinePlus, AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import * as S from './style';
import faker from 'faker';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PagedItemCollection, sp } from '@pnp/sp/presets/all';
import { AddTask } from '../AddTask';
import { ICreateTask, ITask } from '../../types/Interface';
import { Task } from '../Task';
import { GlobalStyle } from '../../styles/global';
import { sleep } from '../../utils/sleep';
import { TasklistProps } from '../../HelloWorldWebPart';
import { Pagination } from '../Pagination';
import { ITEMS_PER_PAGE } from '../../constants';

const Tasklist = ({ context }: TasklistProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [expandedTask, setExpandedTask] = useState<ITask>({} as ITask);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask>();
  const [page, setPage] = useState<PagedItemCollection<ITask[]>>({} as PagedItemCollection<ITask[]>);
  const [isFirstPage, setIsFirstPage] = useState(true);

  useEffect(() => {
    loadFirstPage();
  }, []);

  const loadFirstPage = async () => {
    const currentUserId = context.pageContext.legacyPageContext["userId"];

    const firstPage: PagedItemCollection<ITask[]> = await sp.web.lists.getByTitle("Tarefas")
      .items.top(ITEMS_PER_PAGE)
      .filter(`AuthorId eq ${currentUserId} and Done eq false`)
      .getPaged();

    setTasks(firstPage.results);
    setPage(firstPage);
    setIsFirstPage(true);
  };

  const loadNextPage = async () => {
    const nextPage = await page.getNext();
    setTasks(nextPage.results);
    setPage(nextPage);
    setIsFirstPage(false);
  }

  const handleToggleDone = async (task: ITask) => {
    try {
      await sp.web.lists.getByTitle("Tarefas")
        .items.getById(task.Id)
        .update({
          Done: !task.Done
        });

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
    } catch (err) {
      console.log(err);
    }
  }

  const handleToggleAddTask = async () => {
    setShowAddTask(prevState => !prevState);
    // mockTasks(50);
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

      setTasks(prevState => (
        prevState.map(i => i.Id === updatedTask.Id ? updatedTask : i)
      ));

      setExpandedTask(updatedTask);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteTask = async (task: ITask) => {
    try {
      await sp.web.lists.getByTitle("Tarefas")
        .items.getById(task.Id)
        .delete();

      setTasks(prevState =>
        prevState.filter(i => i.Id !== task.Id)
      );

    } catch (err) {
      console.log(err);
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
      const { data }: { data: ITask } = await sp.web.lists.getByTitle("Tarefas")
        .items.add({
          Title: task.Title,
          Description: task.Description,
          Done: task.Done
        });

      setTasks(prevState => [
        ...prevState, {
          Id: data.Id,
          AuthorId: data.AuthorId,
          Title: data.Title,
          Description: data.Description,
          Done: !!data.Done,
        }
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  const getRandom = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const mockTasks = async (quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      handleAddTask({
        Title: faker.lorem.words(getRandom(10, 1)),
        Description: faker.lorem.paragraphs(getRandom(3, 1)),
        Done: getRandom(0, 1) === 1
      });
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

      <S.Footer>

        <S.LinkWrapper>
          <S.Link>
            Visualizar tarefas finalizadas
          </S.Link>
        </S.LinkWrapper>


        <Pagination
          isFirstPage={isFirstPage}
          hasNext={page.hasNext}
          loadNextPage={loadNextPage}
          loadFirstPage={loadFirstPage}
        />

      </S.Footer>


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

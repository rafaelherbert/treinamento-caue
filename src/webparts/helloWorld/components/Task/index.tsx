import * as React from 'react';
import { ITask } from '../../types/Interface';
import { AiOutlineClose } from 'react-icons/ai';
import * as S from './style';

interface ITaskProps {
  show: boolean;
  task: ITask;
  close: () => void;
  edit: boolean;
  setEditMode: (v: boolean) => void;
  toggleDone: (t: ITask) => Promise<void>;
}

export const Task = (
  { show, task, close, edit, setEditMode, toggleDone }
    : ITaskProps) => {

  return (
    <S.Container show={show}>
      <S.Wrapper>
        <S.ContentContainer>
          <S.CheckboxWrapper>
            <S.Checkbox
              checked={task.Done}
              onClick={() => toggleDone(task)}
            />
          </S.CheckboxWrapper>

          <S.TextContentContainer>

            <S.TitleContainer>
              <S.TaskTitle>
                {task.Title}
              </S.TaskTitle>

              <S.Close onClick={close}>
                <AiOutlineClose />
              </S.Close>
            </S.TitleContainer>

            <S.Description>
              {task.Description}
            </S.Description>

            <S.ButtonsContainer>
              <S.Button>
                Editar
              </S.Button>
            </S.ButtonsContainer>

          </S.TextContentContainer>

        </S.ContentContainer>

      </S.Wrapper>
    </S.Container>
  )
}

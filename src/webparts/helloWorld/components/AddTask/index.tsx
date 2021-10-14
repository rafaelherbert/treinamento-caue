import * as React from 'react';
import { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ICreateTask } from '../../types/Interface';
import * as S from './style';

interface AddTaskProps {
  show: boolean;
  close: () => Promise<void>;
  addTask: (t: ICreateTask) => Promise<void>;
}

export const AddTask = ({ show, close, addTask }: AddTaskProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);


  const closeAndClear = async () => {
    await close();
    setTitle("");
    setDescription("");
  }

  const handleOutsideClick = async (e: MouseEvent) => {
    if (e.target === containerRef.current) {
      closeAndClear();
    }
  }

  const handleCreateTask = async () => {
    if (title.length > 0 && description.length > 0) {
      setIsLoading(true);
      await addTask({
        Title: title,
        Description: description
      });

      setIsLoading(false);
      closeAndClear();
    } else {
      if (title.length === 0) setTitleError(true);
      if (description.length === 0) setDescriptionError(true);
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
          <S.Close onClick={closeAndClear}>
            <AiOutlineClose />
          </S.Close>
          <S.TextContentContainer>

            <S.TitleContainer>
              <S.TaskTitleEdit
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                onKeyPress={() => setTitleError(false)}
                error={titleError}
                placeholder="Título da tarefa"
              />
            </S.TitleContainer>

            <S.TaskDescriptionEdit
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="Descrição da tarefa"
              onKeyPress={() => setDescriptionError(false)}
              error={descriptionError}
              rows="4"
            />


            <S.ButtonsContainer>
              <S.Button onClick={handleCreateTask}>
                Adicionar
              </S.Button>

              <S.Button
                onClick={closeAndClear}
                light
              >
                Cancelar
              </S.Button>

            </S.ButtonsContainer>
          </S.TextContentContainer>
        </S.ContentContainer>
      </S.Wrapper>
    </S.Container>
  )
}


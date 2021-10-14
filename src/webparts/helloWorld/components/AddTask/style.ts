import styled, { css } from 'styled-components';

interface ContainerProps {
  show: boolean;
}

interface ButtonProps {
  light?: boolean;
}

interface TaskTitleEditProps {
  error: boolean;
}

interface TaskDescriptionEditProps {
  error: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  left: 0;
  width: 100%;
  background-color: rgba(0,0,0,0.3);
  transition: 0.3s ease-in-out all;


  ${props => props.show && css`
  opacity: 1;
  pointer-events: all;
  `}
`;

export const Wrapper = styled.div`
  background-color: white;
  max-width: 600px;
  width: 100%;
  border-radius: 1rem;
  position: relative;
  padding: 3rem;
  box-shadow: var(--shadow);
  max-height: 90vh;
`;

export const Close = styled.div`
  position: absolute;
  right: 0.7rem;
  top: 0.7rem;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0px;
  background-color: #313639;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 10;
  transition: 0.2 ease-in-out all;

  &:hover {
    box-shadow: var(--shadow);

  &:active {
    transition: none;
    box-shadow: none;
  }
}
`;

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  padding: 0.4rem 1.5rem;
  background-color: #313639;
  color: white;
  border: none;
  border-radius: 0.2rem;
  transition: 0.2s ease-in-out all;

  &:hover {
    box-shadow: var(--shadow);
  }

  &:active {
    transition: none;
    box-shadow: none;
  }

  ${props => props.light && css`
    background-color: white;
    color: #313639;
    border: 1px solid #313639;
  `}
`;


export const ContentContainer = styled.div`
  display: flex;
`;


export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CheckboxWrapper = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

export const TextContentContainer = styled.div`
  width: 100%;
`;

export const TaskTitleEdit = styled.input<TaskTitleEditProps>`
  padding: 0;
  width: 100%;
  border: none;
  font-size: 1.1rem;
  border-bottom: 1px solid #313639;
  padding:0.3rem;

  ${props => props.error && css`
  border:2px solid #ff0011;
  border-radius: 0.3rem;
  `}
`;

export const TaskDescriptionEdit = styled.textarea<TaskDescriptionEditProps>`
  margin-top: 1rem;
  color: #313639;
  margin-bottom: 2rem;
  width: 100%;
  padding:0.3rem;
  resize: vertical;

  ${props => props.error && css`
  border:2px solid #ff0011;
  border-radius: 0.3rem;
  `}
`;

export const TitleContainer = styled.div`
`;

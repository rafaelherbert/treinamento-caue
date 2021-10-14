import styled, { css } from 'styled-components';

interface ContainerProps {
  show: boolean;
}

interface CheckboxProps {
  checked: boolean;
}

interface ButtonProps {
  light?: boolean;
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

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Checkbox = styled.div<CheckboxProps>`
  border:1px solid #313639;
  border-radius: 50%;
  height: 1.2rem;
  width: 1.2rem;
  cursor: pointer;
  margin-right: 0.5rem;
  position: relative;
  transition: 0.3s ease-in-out all;

  ${props => !props.checked && css`
    &:hover {
      background-color: #ECECEC;

      &:after {
      opacity: 0.5;
      }
    }
  `}

  &:after {
    content: "";
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border:2px solid white;
    opacity: 0;
    transition: 0.2s ease-in-out all;
  }

  ${props => props.checked && css`
    background-color: #313639;

    &:after {
      opacity: 1;
    }
  `}
`;

export const TaskTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  flex-grow: 1;
  line-height: 2rem;
`;

export const Description = styled.div`
  margin-top: 1rem;
  color: #313639;
  margin-bottom: 2rem;
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

export const TaskTitleEdit = styled.input`
  padding: 0;
  width: 100%;
  border: none;
  font-size: 1.3rem;
  font-weight: bold;
  border-bottom: 1px solid #313639;
`;

export const TaskDescriptionEdit = styled.textarea`
  margin-top: 1rem;
  color: #313639;
  margin-bottom: 2rem;
  width: 100%;
  resize: vertical;
`;

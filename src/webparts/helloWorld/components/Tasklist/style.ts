import styled, { css } from 'styled-components';

interface DescriptionProps {
  show: boolean;
}

interface CheckboxProps {
  checked: boolean;
}


export const Container = styled.div`
  padding: 0 2rem;
  position: relative;
  overflow: hidden;
`;

export const ContainerTasks = styled.div`
`;


export const Task = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
  border-bottom: 1px solid #ECECEC;
`;

export const TitleContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  flex-grow: 1;
`;

export const Checkbox = styled.div<CheckboxProps>`
  border:1px solid #313639;
  border-radius: 50%;
  height: 0.8rem;
  width: 0.8rem;
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


export const TaskTitle = styled.p`
  margin: 0;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
`;


export const Description = styled.p<DescriptionProps>`
  height: 0px;
  margin: 0;
  overflow: hidden;

  ${props => props.show && css`
  height: auto;
  margin-bottom: 0.8rem;
  margin-top: 0.1rem;
  `}
`;

export const AddTaskBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0;
  background-color: #313639;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: 0.2 ease-in-out all;

  &:hover {
    box-shadow: var(--shadow);
  }

  &:active {
    transition: none;
    box-shadow: none;
  }
`;

export const TaskOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TaskOption = styled.button`
  cursor: pointer;
  font-size: 1.2rem;
  border: none;
  background-color: transparent;
  color: rgba(0,0,0,0.5);

  &:hover {
    color: rgba(0,0,0,1);
  }
`;

export const TasklistTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    flex-grow: 1;
    font-size: 1.5rem;
  }
`;

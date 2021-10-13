import styled, { css } from 'styled-components';

interface DescriptionProps {
  show: boolean;
}


export const Container = styled.div`
  padding: 2rem;
  position: relative;
  overflow: hidden;

  h2 {
    font-size: 1.5rem;
  }
`;

export const ContainerTasks = styled.div`
`;


export const Task = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.25rem;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;

  input {
      border-radius: 0.3rem;
      margin-right: 0.5rem;
    }

    p {
      margin: 0;
      font-size: 1.2rem;
      cursor: pointer;
      transition: 0.3s ease-in-out all;

      &:hover {
        -webkit-text-stroke-width: 0.5px;
      }
    }
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
  position: absolute;
  bottom: 50px;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0px;
  background-color: #313639;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.7rem;
  z-index: 10;
`;

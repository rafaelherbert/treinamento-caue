import styled, { css } from 'styled-components';

interface ContainerProps {
  show: boolean;
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

import styled, { css } from 'styled-components';

interface ButtonProps {
  current: boolean;
}

export const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  border: 0;
  background-color: white;
  color: #313639;
  border:1px solid #313639;
  cursor: pointer;
  font-size: 1.2rem;
  height: 2rem;
  width: 2rem;
  transition: 0.2 ease-in-out all;

  ${props => props.current && css`
    background-color: #313639;
    color: white;
    border: none;
    pointer-events: none;
  `}

  &:hover {
    box-shadow: var(--shadow);
  }

  &:active {
    transition: none;
    box-shadow: none;
  }
`;

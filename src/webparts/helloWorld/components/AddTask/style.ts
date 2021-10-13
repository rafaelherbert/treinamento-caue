import styled, { css } from 'styled-components';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  height: 100%;
  bottom: -100%;
  left: 0;
  width: 100%;
  transition: 0.3s ease-in-out all;
  background-color: white;

  ${props => props.show && css`
  bottom: 0;
  `}
`;

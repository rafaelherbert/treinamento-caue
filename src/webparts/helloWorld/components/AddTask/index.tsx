import * as React from 'react';
import * as S from './style';

interface AddTaskProps {
  show: boolean;
}

export const AddTask = ({ show }: AddTaskProps) => {
  return (
    <S.Container show={show}>
      Adicionar tarefa
    </S.Container>
  )
}


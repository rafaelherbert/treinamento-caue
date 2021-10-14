import * as React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import * as S from './style';

interface ModalProps {
  show: boolean;
}

export const Modal = ({ show }: ModalProps) => {
  return (
    <S.Container show={show}>
      <S.Wrapper>
        <S.Close onClick={close}>
          <AiOutlineClose />
        </S.Close>

      </S.Wrapper>
    </S.Container>
  )
}

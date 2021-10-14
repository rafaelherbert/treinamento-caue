import * as React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import * as S from './style';

export const Modal = () => {
  return (
    <S.Container show={true}>
      <S.Wrapper>
        <S.Close onClick={close}>
          <AiOutlineClose />
        </S.Close>

      </S.Wrapper>
    </S.Container>
  )
}

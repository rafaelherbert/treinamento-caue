import * as React from 'react';
import * as S from './style';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineHome } from 'react-icons/ai';
import { ITEMS_PER_PAGE } from '../../constants';

interface PaginationProps {
  isFirstPage: boolean;
  hasNext: boolean;
  loadNextPage: () => void;
  loadFirstPage: () => void;
}

export const Pagination = ({ isFirstPage, hasNext, loadNextPage, loadFirstPage }: PaginationProps) => {
  return (
    <S.Container>
      {!isFirstPage && (
        <S.Button onClick={loadFirstPage}>
          <AiOutlineHome />
        </S.Button>
      )}

      {hasNext && (
        <S.Button onClick={loadNextPage}>
          <AiOutlineArrowRight />
        </S.Button>
      )}

    </S.Container>
  )
}


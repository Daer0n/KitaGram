import styled from 'styled-components';

export const SearchFilterInputContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 16px 16px 0 16px;
`;

export const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  margin: 0;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const CategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Category = styled.div`
  border-radius: 8px;
  padding: 5px;
  color: #fff;
  font-size: 20px;
  background-color: #ff8585;
  cursor: pointer;
`;
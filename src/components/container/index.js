import styled, { css } from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgb(0, 0, 0 0.1);
  padding: 30px;
  margin: 80px auto;
  ${props =>
    props.minH &&
    css`
      min-height: ${props.minH}px;
    `}

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;

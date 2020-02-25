import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;
export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;
        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
export const Loader = styled.img`
  margin: 10px auto;
  display: flex;
  transition: 0.5s ease-out;
  width: 73.5%;
`;
export const FilterIssues = styled.div`
  max-width: 320px;
  margin: 20px auto;

  > img {
    margin: 20px auto;
    display: flex;
    flex: 1;
  }
  button {
    width: 100px;
    padding: 15px 20px;
    box-sizing: border-box;
    background-color: #7159c1;
    color: #fff;
    border-radius: 5px;
    border: none;
    font-weight: 700;
    cursor: pointer;

    ${props =>
      props.selected === 'all' &&
      css`
        &:nth-of-type(1) {
          border: 2px solid red;
        }
      `}

    ${props =>
      props.selected === 'open' &&
      css`
        &:nth-of-type(2) {
          border: 2px solid red;
        }
      `}

      ${props =>
        props.selected === 'closed' &&
        css`
          &:nth-of-type(3) {
            border: 2px solid red;
          }
        `}
    & + button {
      margin-left: 10px;
    }
  }
`;

export const Pages = styled.div`
  list-style: none;
  display: flex;
  margin: 20px auto;
  justify-content: center;
  align-items: center;
  flex: 1;
  button {
    padding: 20px;
    color: #fff;
    background-color: #7159c1;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    border: none;
    ${props =>
      props.pageCount === 1 &&
      css`
        &:nth-of-type(1) {
          cursor: not-allowed;
          opacity: 0.5;
          pointer-events: none;
        }
      `}
    & + button {
      margin-left: 10px;
    }
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
    background-color: #7159c1;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    box-sizing: border-box;
    margin: 0 20px;
    font-weight: 700;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  }
`;
export const PageItem = styled.li``;

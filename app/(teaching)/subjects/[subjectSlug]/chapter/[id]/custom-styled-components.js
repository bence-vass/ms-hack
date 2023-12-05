import styled from "styled-components";

export const SpinContainer = styled.div`
  width: 100%;
  height: 100%;
  display: table;

  div {
    vertical-align: middle;
    display: table-cell;
    pointer-events: none;
    user-select: none;
  }
  
  
`


export const FloatingControl = styled.div`
  position: fixed;
  z-index: 900;
  display: none;
  
`

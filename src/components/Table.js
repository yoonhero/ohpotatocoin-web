import styled from "styled-components"

export const Li = styled.li`
 border-radius: 3px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; 
`
export const TableHeader = styled(Li)`
  background-color: #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 20px;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
@media only screen and (max-width: 767px) {
    display: none;
}
`

export const TableRow = styled(Li)`
background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  /* padding: 12px; */

@media only screen and (max-width: 767px) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  div {
    flex-basis: 100%;
    display: flex;
    padding: 20px 0;
    &:before {
      color: #6c7a89;
      padding-right: 10px;
      content: attr(data-label);
      flex-basis: 0%;
      text-align: right;
    }
  }
}
`

export const Col1 = styled.div`
  flex-basis: 15%;
  color: rgb(20, 70, 153);
`

export const HoverCol1 = styled.div`
color: rgb(20, 70, 153);
&:hover{
    text-decoration: underline;
  }`

export const Col2 = styled.div`
flex-basis: 55%;
color: rgb(20, 70, 153);
`

export const HoverCol2 = styled.div`
color: rgb(20, 70, 153);
&:hover{
    text-decoration: underline;
  }`

export const Col3 = styled.div`
   flex-basis: 20%;
`

export const Col4 = styled.div`
  flex-basis: 10%;
`
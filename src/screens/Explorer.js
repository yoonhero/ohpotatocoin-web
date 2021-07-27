import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import axios from "axios"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Slider from "react-slick";
import { CarouselSettings } from "../components/Carousel"
import Loading from "../components/Loading"

const Li = styled.li`
 border-radius: 3px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; 
`

const TableRow = styled(Li)`
background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;

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
`

const Col1 = styled.div`
  flex-basis: 15%;
  color: rgb(20, 70, 153);
`

const HoverCol1 = styled(Col1)`
&:hover{
    text-decoration: underline;
  }`

const Col2 = styled.div`
flex-basis: 55%;
color: rgb(20, 70, 153);
`

const HoverCol2 = styled(Col2)`
&:hover{
    text-decoration: underline;
  }`

const Col3 = styled.div`
   flex-basis: 20%;
`

const Col4 = styled.div`
  flex-basis: 10%;
`


function Explorer() {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/blocks'
      );
      let newArr = [...response.data];
      console.log(newArr)
      setData(newArr)
    } catch (e) {
      console.log(e)
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchData()
    setLoading(false);
  }, [])
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <Layout>
      <PageTitle title={ "탐험" } />
      { loading || data === undefined ? (
        <Loading />
      ) :

        <div className=" p-10 w-2/3 font-sans subpixel-antialiased ">
          <Slider { ...CarouselSettings }>
            { data.map((block, index) => {
              if (index < 6) {
                return (
                  <TableRow key={ index }>
                    <Link to={ "/block/" + block.hash }>

                      <HoverCol1 data-label="Height">{ block.height }</HoverCol1>
                    </Link>
                    <Link to={ "/block/" + block.hash }>
                      <HoverCol2 data-label="Hash">{ block.hash.slice(0, 2) + "..." + block.hash.slice(-20, -1) }</HoverCol2>
                    </Link>
                    <Col3 data-label="PrevHash">{ block.prevHash !== undefined ? block.prevHash.slice(0, 2) + "..." + block.prevHash.slice(-10, -1) : null } </Col3>
                    <Col4 data-label="TimeStamp">{ block.timestamp }</Col4>
                  </TableRow>
                )
              }
            }
            ) }

          </Slider>
          <Link to="/blocks">All Blocks</Link>
        </div> }
    </Layout >
  )
}

export default Explorer
import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import axios from "axios"
import { Link } from "react-router-dom"
import styled from "styled-components"
import ReactPaginate from 'react-paginate';
import Loading from "../components/Loading"
import { GetWindowDimensions } from "../utils"

const Li = styled.li`
 border-radius: 3px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; 
`
const TableHeader = styled(Li)`
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

const TableRow = styled(Li)`
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

const Col1 = styled.div`
  flex-basis: 15%;
  color: rgb(20, 70, 153);
`

const HoverCol1 = styled.div`
color: rgb(20, 70, 153);
&:hover{
    text-decoration: underline;
  }`

const Col2 = styled.div`
flex-basis: 55%;
color: rgb(20, 70, 153);
`

const HoverCol2 = styled.div`
color: rgb(20, 70, 153);
&:hover{
    text-decoration: underline;
  }`

const Col3 = styled.div`
   flex-basis: 20%;
`

const Col4 = styled.div`
  flex-basis: 10%;
`

function Blocks() {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [windowDimensions, setWindowDimensions] = useState(GetWindowDimensions())
  const [mobile, setMobile] = useState(false)
  const [pages, setPages] = useState(10)
  const [selected, setSelected] = useState(0)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/blocks'
      );
      let newArr = [...response?.data];
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
    function handleResize() {
      setWindowDimensions(GetWindowDimensions());

    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    if (mobile) {
      setPages(10)
    } else {
      setPages(30)
    }
  }, [mobile])

  useEffect(() => {
    setMobile(windowDimensions.width < 580)
    setOffset(0)
    setSelected(0)
  }, [windowDimensions])

  useEffect(() => {
    if (data === undefined) {
      return
    }
    setPageCount(Math.ceil(data.length / pages))
  }, [data])

  useEffect(() => {
    if (data === undefined) {
      return
    }
    setPageCount(Math.ceil(data.length / pages))
    setOffset(Math.ceil(selected * pages))
  }, [pages])

  useEffect(() => {
    setOffset(Math.ceil(selected * pages))
  }, [selected])

  const handlePageClick = (data) => {
    setSelected(data?.selected)
  }

  return (
    <Layout>
      <PageTitle title={ "All Blocks" } />
      <div className="flex items-center flex-col w-screen" >
        { loading || data === undefined ? (
          <Loading />
        ) : <> {

          mobile === true ? (<ul className="p-5 w-screen">
            <TableHeader>
              <Col1>Id</Col1>
              <Col2>Hash</Col2>
              <Col3>PrevHash</Col3>
              <Col4>Time</Col4>
            </TableHeader>
            { data.map((block, index) => {
              if (index >= offset && index < offset + pages) {
                return (
                  <TableRow className="p-15 m-10" key={ block?.height }>
                    <Link to={ "/block/" + block?.hash }>

                      <HoverCol1 data-label="Height">{ block?.height }</HoverCol1>
                    </Link>
                    <Link to={ "/block/" + block?.hash }>
                      <HoverCol2 data-label="Hash">{ block?.hash.slice(0, 2) + "..." + block?.hash.slice(-20, -1) }</HoverCol2>
                    </Link>
                    <Col3 data-label="PrevHash">{ block?.prevHash !== undefined ? block?.prevHash.slice(0, 2) + "..." + block?.prevHash.slice(-10, -1) : null } </Col3>
                    <Col4 data-label="TimeStamp">{ block?.timestamp }</Col4>
                  </TableRow>
                )
              }
            }

            ) }
          </ul>) : <div className="flex ">
            <div className="col-span-12 p-4">
              <div className="overflow-auto  lg:overflow-visible">
                <table className="table text-gray-400 border-collapse space-y-6 text-sm ">
                  <thead className="text-gray-500 rounded-lg ">
                    <tr>
                      <th className="p-3">Id</th>
                      <th className="p-3 text-left">Hash</th>
                      <th className="p-3 text-left">PrevHash</th>
                      <th className="p-3 text-left">TimeStamp</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    { data.map((block, index) => {
                      if (index > offset && index < offset + pages) {

                        return (
                          <tr className="p-5 rounded-lg" key={ block?.height }>

                            <td className="p-3 ">
                              {/* <span className="hidden md:block">Id</span> */ }
                              <Link to={ "/block/" + block?.hash }>
                                <HoverCol1 data-label="Height">{ block?.height }</HoverCol1>
                              </Link>
                            </td>
                            <td className="p-3 font-bold ">
                              {/* <span className="hidden md:block">Hash</span> */ }
                              <Link to={ "/block/" + block?.hash }>
                                <HoverCol2 data-label="Hash">{ block?.hash.slice(0, 2) + "..." + block?.hash.slice(-20, -1) }</HoverCol2>
                              </Link>
                            </td>
                            <td className="p-3 ">
                              {/* <span className="hidden md:block">PrevHash</span> */ }
                              <span className="rounded-md px-2">{ block?.prevHash !== undefined ? block?.prevHash.slice(0, 2) + "..." + block?.prevHash.slice(-10, -1) : null } </span>
                            </td>
                            <td className="p-3 md:flex flex-row">
                              {/* <span className="hidden md:block">TimeStamp</span> */ }
                              <span className="rounded-md px-2">{ block?.timestamp }</span>
                            </td>
                          </tr>
                        )
                      }
                    }

                    ) }


                  </tbody>
                </table>


              </div>
            </div>
          </div>

        }</>

        }
        <div className="flex items-center">
          <ReactPaginate
            previousLabel={ 'previous' }
            nextLabel={ 'next' }
            breakLabel={ '...' }
            breakClassName={ 'break-me ' }
            pageCount={ pageCount }
            marginPagesDisplayed={ 1 }
            pageRangeDisplayed={ 2 }
            onPageChange={ handlePageClick }
            containerClassName={ 'pagination' } /* as this work same as bootstrap class */
            subContainerClassName={ 'pages pagination ' } /* as this work same as bootstrap class */
            activeClassName={ 'active' }
          />
        </div>
      </div>
    </Layout>
  )
}

export default Blocks
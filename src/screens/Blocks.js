import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import axios from "axios"
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate';
import Loading from "../components/Loading"
import { GetWindowDimensions,DB_Address } from "../utils"
import { Col1, Col2, Col3, Col4, TableHeader, TableRow, HoverCol1, HoverCol2 } from "../components/Table"


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
        DB_Address+"/blocks"
      );
      let newArr = [...response?.data];
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
      <div className="flex flex-col items-center justify-center w-screen" >
        { loading || data === undefined ? (
          <Loading />
        ) : <>
        <div className="w-full h-20"></div>

          <div className="font-sans text-2xl md:text-3xl text-gray-600 font-bold p-2 md:p-4">
            <span>All Blocks</span>
          </div>
          { mobile === true ? (<ul className="p-5 w-screen">
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
          </ul>) : <div className="flex bg-gray-50 rounded-2xl shadow-lg m-4">
            <div className="col-span-12 p-4 ">
              <div className="overflow-auto  lg:overflow-visible">
                <table className="table text-gray-400 border-collapse space-y-6 text-sm divide-y-2 divide-dashed divide-gray-400">
                  <thead className="text-gray-500 rounded-lg ">
                    <tr className="">
                      <th className="p-3">Id</th>
                      <th className="p-3 text-left">Hash</th>
                      <th className="p-3 text-left">PrevHash</th>
                      <th className="p-3 text-left">TimeStamp</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    { data.map((block, index) => {
                      if (index >= offset && index < offset + pages) {
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

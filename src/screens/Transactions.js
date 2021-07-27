import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import axios from "axios"
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate';
import Loading from "../components/Loading"
import { GetWindowDimensions } from "../utils"
import { Col1, Col2, Col3, Col4, TableHeader, TableRow, HoverCol1, HoverCol2 } from "../components/Table"

const Transactions = () => {
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
        'http://localhost:4000/transactions'
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
    setMobile(windowDimensions.width < 700)
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

          mobile === true ? (<ul className="md:p-5 w-full">
            <TableHeader>
              <Col1>Id</Col1>
              <Col2>Hash</Col2>
              <Col3>PrevHash</Col3>
              <Col4>Time</Col4>
            </TableHeader>
            { data.map((tx, index) => {
              if (index >= offset && index < offset + pages) {
                return (
                  <TableRow className="p-15 m-4" key={ tx?.id }>
                    <Link to={ "/transaction/" + tx?.id }>

                      <HoverCol1 data-label="Hash">{ tx?.id.slice(0, 2) + "..." + tx?.id.slice(-20, -1) }</HoverCol1>
                    </Link>
                    {/* <Link to={ "/block/" + block?.hash }>
                      <HoverCol2 data-label="Hash">{ block?.hash.slice(0, 2) + "..." + block?.hash.slice(-20, -1) }</HoverCol2>
                    </Link>
                    <Col3 data-label="PrevHash">{ block?.prevHash !== undefined ? block?.prevHash.slice(0, 2) + "..." + block?.prevHash.slice(-10, -1) : null } </Col3> */}
                    <Col4 data-label="TimeStamp">{ tx?.timestamp }</Col4>
                  </TableRow>
                )
              }
            }

            ) }
          </ul>) : <div className="flex bg-gray-50 rounded-2xl shadow-lg m-4 ">
            <div className="col-span-12 p-4 ">
              <div className="overflow-auto  lg:overflow-visible">
                <table className="table text-gray-400 border-collapse space-y-6 text-sm divide-y-2 divide-dashed divide-gray-400">
                  <thead className="text-gray-500 rounded-lg ">
                    <tr className="">
                      <th className="p-3">Hash</th>
                      <th className="p-3 text-left">TimeStamp</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    { data.map((tx, index) => {
                      if (index > offset && index < offset + pages) {

                        return (
                          <tr className="p-5 rounded-lg" key={ tx?.id }>
                            <td className="p-3 ">
                              {/* <span className="hidden md:tx">Id</span> */ }
                              <Link to={ "/transaction/" + tx?.id }>
                                <HoverCol1 data-label="Hash">{ tx?.id }</HoverCol1>
                              </Link>
                            </td>
                            {/* <td className="p-3 font-bold ">
                               <span className="hidden md:tx">Hash</span> 
                              <Link to={ "/tx/" + tx?.hash }>
                                <HoverCol2 data-label="Hash">{ tx?.hash.slice(0, 2) + "..." + tx?.hash.slice(-20, -1) }</HoverCol2>
                              </Link>
                            </td>
                            <td className="p-3 ">
                               <span className="hidden md:tx">PrevHash</span> 
                              <span className="rounded-md px-2">{ tx?.prevHash !== undefined ? tx?.prevHash.slice(0, 2) + "..." + tx?.prevHash.slice(-10, -1) : null } </span>
                            </td> */}
                            <td className="p-3 md:flex flex-row">
                              {/* <span className="hidden md:tx">TimeStamp</span> */ }
                              <span className="rounded-md px-2">{ tx?.timestamp }</span>
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

export default Transactions
import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import axios from "axios"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Slider from "react-slick";
import { CarouselSettingsExplorer } from "../components/Carousel"
import Loading from "../components/Loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { DB_Address } from "../utils"

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
  const [txs, setTxs] = useState()
  const [status, setStatus] = useState()

  const fetchData = async () => {
    try {
      const response = await axios.get(
        DB_Address + '/latestblocks'
      );
      let newArr = [...response.data];
      setData(newArr)

      const status_response = await axios.get(
        DB_Address+"/status"
      );
      setStatus(status_response.data)

      const tx_respone = await axios.get(
        DB_Address+'/latesttransactions'
      );
      let txArr = []
      for (const [_, value] of Object.entries(tx_respone.data)) {
        txArr.push(value)
      }
      setTxs(txArr)

    } catch (e) {
      console.log(e)
    }
  };


  useEffect(() => {
    setLoading(true);
    fetchData()
    setLoading(false);
  }, [])

  return (
    <Layout>
      <PageTitle title={ "Explorer" } />
      { loading || data === undefined ? (
        <Loading />
      ) : (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <div className="w-full h-10"></div>
          <div className="flex flex-col items-center justify-center p-10 w-full  font-sans subpixel-antialiased md:w-10/12 divide-y-2 divide-gray-600 divide-dashed">
            <div className="mb-4">
              <div className="p-2 font-bold text-xl md:text-2xl">
                <span>Ohpotato 코인</span>
              </div>
              <div className="p-1 font-normal text-lg text-gray-500">
                <span>
                  Blockchain information for OhPotatoCoin (OPC) including historical prices, the most recently mined blocks, and data for the latest transactions. Currenty Difficulty is { status?.currentDifficulty }. And the length of the ohpotato chain is { status?.height }.
                </span>
              </div>
            </div>
            {/* latest block and latest transaction */ }
            <div className=" w-full flex flex-col md:flex-row">
              {/* Latest block */ }
              <div className="mt-4 w-full flex flex-col md:w-1/2 md:p-5 ">
                <div className="p-2 font-medium text-lg ">
                  <span>Latest Blocks</span>
                </div>
                <div>
                  <Slider { ...CarouselSettingsExplorer }>
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
                      return null
                    }
                    ) }
                  </Slider>
                </div>
                <div className="mt-10">
                  <Link to="/blocks">
                    <button className="bg-white shadow-xl rounded-lg p-4 border border-gray-200 hover:border-blue-600  ">

                      <span className="p-2 text-blue-600 font-bold text-normal">View All Blocks</span>
                      <FontAwesomeIcon icon={ faArrowRight } color="#2463EB" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-4 w-full flex flex-col md:w-1/2 md:p-5">
                <div className="p-2 font-medium text-lg ">
                  <span>Latest Transactions</span>
                </div>

                <div>
                  <Slider { ...CarouselSettingsExplorer }>
                    { txs?.map(tx => {
                      return tx?.txOuts?.map(txout => {
                        return (
                          <>
                            <TableRow key={ txout?.address }>
                              <Link to={ "/transaction/" + tx?.id }>
                                <HoverCol1 data-label="Hash">{ tx?.id?.slice(0, 2) + "..." + tx?.id?.slice(-20, -1) }</HoverCol1>
                              </Link>
                              <Link to={ "/transaction/" + tx?.id }>
                                <HoverCol2 data-label="Address">{ txout?.address?.slice(0, 2) + "..." + txout?.address?.slice(-20, -1) }</HoverCol2>
                              </Link>
                              <Col3 data-label="Amount">{ txout?.amount } </Col3>
                              <Col4 data-label="TimeStamp">{ tx?.timestamp }</Col4>
                            </TableRow>
                          </>
                        )
                      })
                    }) }
                  </Slider>
                </div>
                <div className="mt-10">
                  <Link to="/transactions">
                    <button className="bg-white shadow-xl rounded-lg p-4 border border-gray-200 hover:border-blue-600  ">

                      <span className="p-2 text-blue-600 font-bold text-normal">View All Transaction</span>
                      <FontAwesomeIcon icon={ faArrowRight } color="#2463EB" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }
    </Layout >

  )
}

export default Explorer

// function a() {
//   return (
//     <TableRow key={ index }>
//       <Link to={ "/transaction/" + tx?.id }>

//         <HoverCol1 data-label="Hash">{ tx?.id }</HoverCol1>
//       </Link>
//       <Link to={ "/transaction/" + tx?.id }>
//         <HoverCol2 data-label="Address">{ txOut?.address?.slice(0, 2) + "..." + txOut?.address?.slice(-20, -1) }</HoverCol2>
//       </Link>
//       <Col3 data-label="Amount">{ txOut?.amount } </Col3>
//       <Col4 data-label="TimeStamp">{ tx?.timestamp }</Col4>
//     </TableRow>
//   )
// }

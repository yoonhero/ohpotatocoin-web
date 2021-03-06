import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import { Link } from "react-router-dom"
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import 'animate.css/animate.compat.css'
import Loading from "../components/Loading"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Slider from "react-slick";
import Notification from "../components/Notif"
import { CarouselSettings } from "../components/Carousel"
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


const Main = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align:center;
`
const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  text-align:center;
  color: #1e4151;
  padding: 30px;
`

const Block = () => {
    const { hash } = useParams()
    const [data, setData] = useState([])
    const [miner, setMiner] = useState("")
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState()
    const [reward, setReward] = useState()
    const getBlockData = async () => {

        const block = await axios.get(DB_Address + "/blocks/" + hash)
        setData(block.data)
    }

    useEffect(() => {
        setLoading(true)
        getBlockData()
        setLoading(false)
    }, [])

    useEffect(() => {
        if (data !== []) {
            let dt = new Date(data?.timestamp * 1000)
            dt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes()
            setDate(dt)
            data?.transactions?.map(tx => {

                tx?.txIns?.map(txin => {
                    if (txin?.signature === "COINBASE") {
                        setMiner(tx?.txOuts[0]?.address)
                        setReward(tx?.txOuts[0]?.amount + " ohpotato")
                        return 0
                    }
                })
            })
        }
    }, [data])

    ///shadow-xl 
    return (
        <>
            <ReactNotification />
            <Layout>


                <PageTitle title={ "Block" } />
                <div className="w-full min-h-screen flex flex-col items-center justify-center">
                    <div className="w-full h-20"></div>
                    <Main>

                        { loading ? <Loading /> : <Info>
                            <h1 className="font-sans text-2xl md:text-4xl antialiased font-bold  ...">Block { data?.height }</h1>
                            <div style={ { padding: 20 } } className="flex flex-col ...">
                                <p className="font-mono font-medium leading-normal ...">This block was mined on { date } </p>
                                <p className="font-mono font-medium leading-normal break-all ...">The Block rewards, also known as the Coinbase reward, were sent to this { miner } address</p>
                            </div>
                            <div className="flex flex-col p-3 select-none">
                                <div className="divide-y-2 divide-solid  divide-black divide-opacity-10 ">
                                    {/* <div className="flex flex-row  flex-wrap items-center ...">
                <div className="font-sans text-lg p-3 w-40 ... ">Id</div>
                <div className="font-sans text-normal p-3 ...">{ data.height }</div>
              </div> */}
                                    <div className="flex flex-row  flex-wrap items-center   ...">
                                        <div className="font-sans text-lg p-3 w-40 ... " >Hash</div>
                                        <CopyToClipboard text={ data?.hash } onCopy={ () => {
                                            store.addNotification({
                                                ...Notification("Now Block's Hash is copied to your clipboard"),
                                                container: "bottom-left",

                                            })
                                        } } >
                                            <div className="w-full  md:w-auto font-sans text-normal p-3 cursor-pointer break-all ...">{ data?.hash?.slice(0, 80) + "..." }</div>
                                        </CopyToClipboard>

                                    </div>
                                    <div className="flex flex-row  flex-wrap items-center  ...">
                                        <div className="font-sans text-lg p-3 w-40 ... ">PrevHash</div>
                                        <CopyToClipboard text={ data?.prevHash } onCopy={ () => {
                                            store.addNotification({
                                                ...Notification("Now Block's Previous Hash is copied to your clipboard"),
                                                container: "bottom-left",

                                            })
                                        } } >
                                            <div className="w-full  md:w-auto font-sans text-normal p-3 cursor-pointer break-all ...">{ data?.prevHash?.slice(0, 80) + "..." }</div>
                                        </CopyToClipboard>

                                    </div>
                                    <div className="flex flex-row  flex-wrap items-center ...">
                                        <div className="font-sans text-lg p-3 w-40 ... ">TimeStamp</div>
                                        <div className="font-sans text-normal p-3 ...">{ date }</div>
                                    </div>
                                    <div className="flex flex-row  flex-wrap items-center ...">
                                        <div className="font-sans text-lg p-3 w-40 ... ">Miner</div>
                                        <div className="w-full md:w-auto font-sans text-normal p-3 ...">{ miner.slice(0, 40) + "..." }</div>
                                    </div>
                                    <div className="flex flex-row  flex-wrap items-center ...">
                                        <div className="font-sans text-lg p-3 w-40 ... ">Difficulty</div>
                                        <div className="font-sans text-normal p-3 ...">{ data?.difficulty }</div>
                                    </div>
                                    <div className="flex flex-row  flex-wrap items-center ...">
                                        <div className="font-sans text-lg p-3 w-40 ... ">Nonce</div>
                                        <div className="font-sans text-normal p-3 ...">{ data?.nonce }</div>
                                    </div>
                                    <div className="flex flex-row  flex-wrap items-center ...">
                                        <div className="font-sans text-lg p-3 w-40 ... ">BlockReward</div>
                                        <div className="font-sans text-normal p-3 ...">{ reward }</div>
                                    </div>
                                </div>

                            </div>

                            { data.transactions !== undefined && data.transactions !== null ? <div className="mt-10 md:p-10 w-10/12 md:w-2/3 font-sans subpixel-antialiased ">
                                <Slider { ...CarouselSettings }>
                                    { data?.transactions?.map((tx, index) => {
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
                            </div> : null }

                        </Info>
                        }
                    </Main>
                </div>
            </Layout>
        </>
    )
}

export default Block


// {/* <div key={ index } className="p-8 h-80 relative mx-auto overflow-hidden rounded-3xl items-center content-center bg-blue-50 shadow hover:bg-blue-100 ... ">
//                         <span className="animate-ping delay-2000 duration-3000 absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
//                         <div className="flex flex-col items-center p-3">
//                           <p className="font-sans text-2xl subpixel-antialiased text-gray-700 font-bold ">Transaction</p>
//                           <p className="font-sans text-lg subpixel-antialiased font-medium text-gray-600" > { tx?.id?.slice(0, 20) + "..." }</p>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 divide-x-2 divide-gray-600   ...">
//                           { tx?.txOuts?.map(txout => {
//                             return (
//                               <div className="flex flex-col p-2 text-gray-600 text-lg font-light ">
//                                 <div>Address: { txout?.address?.slice(0, 20) + "..." }</div>
//                                 <div>Amount: { txout?.amount }</div>
//                               </div>
//                             )
//                           }) }
//                         </div>
//                       </div> */}

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
    padding: 20px;
    border-radius:20px;
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
    }
`

const Col2 = styled.div`
    flex-basis: 55%;
    color: rgb(20, 70, 153);
`

const HoverCol2 = styled(Col2)`
    &:hover{
        text-decoration: underline;
    }
`

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

const Transaction = () => {
    const { hash } = useParams()
    const [data, setData] = useState([])
    const [miner, setMiner] = useState("")
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState()
    const [reward, setReward] = useState()
    const getBlockData = async () => {
        const block = await axios.get(DB_Address + "/transaction/" + hash)
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

        }
    }, [data])

    ///shadow-xl 
    return (
        <>
            <Layout>
                <PageTitle title={ "Transaction" } />
                <div className="w-full min-h-screen flex flex-col items-center justify-center">
                    <div className="w-full h-10"></div>

                    <Main>

                        { loading ? <Loading /> : <Info>
                            <h1 className="font-sans text-3xl md:text-4xl antialiased font-bold p-3  ...">Transaction </h1>
                            <span className="font-sans fond-medium text-base break-all md:text-lg">{ data?.id }</span>
                            <div style={ { padding: 20 } } className="flex flex-col ...">
                                <p className="font-mono font-medium leading-normal ...">This Transaction was confirmed on { date } </p>
                            </div>
                            <div className="mt-4 w-full flex flex-col md:w-1/2 md:p-5 ">
                                <div>
                                    <Slider { ...CarouselSettings }>
                                        { data?.txOuts?.map((txout, index) => {
                                            if (index < 6) {
                                                return (
                                                    <TableRow key={ index } className="bg-blue-100 shadow-lg">
                                                        <Col1 data-label="Hash">{ data?.id?.slice(0, 2) + "..." + data?.id?.slice(-20, -1) }</Col1>
                                                        <Col2 data-label="Address">{ txout?.address?.slice(0, 2) + "..." + txout?.address?.slice(-20, -1) }</Col2>
                                                        <Col3 data-label="TimeStamp">{ txout?.amount }</Col3>
                                                        <Col4 data-label="TimeStamp">{ data?.timestamp }</Col4>
                                                    </TableRow>
                                                )
                                            }
                                            return null
                                        }
                                        ) }
                                    </Slider>
                                </div>
                            </div>

                        </Info>
                        }
                    </Main>
                </div>
            </Layout>
        </>
    )
}

export default Transaction

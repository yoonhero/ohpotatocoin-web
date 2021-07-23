import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import { Link } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Loading from "../components/Loading"

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
const Title = styled.span`
  font-size: 30px;
  font-weight: 500;
`
const Desc = styled.p``
const BlockInfo = styled.div``


const Li = styled.li`
 border-radius: 3px;
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid #000;
  div{
    display: flex;
    flex-direction: row;
  } 
  
`


const Block = () => {
  const { hash } = useParams()
  const [data, setData] = useState([])
  const [miner, setMiner] = useState("")
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState()
  const [reward, setReward] = useState()
  const getBlockData = async () => {
    const block = await axios.get("http://localhost:4000/blocks/" + hash)
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

  const CreateNotif = (message, title) => {
    NotificationManager.success(message, title);
  }

  ///shadow-xl 
  return (
    <Layout>
      <PageTitle title={ "Block" } />
      <Main>

        { loading ? <Loading /> : <Info>
          <button onClick={ () => CreateNotif("copied to your clipboard", "Success") }>notif</button>
          <h1 className="font-sans text-2xl md:text-4xl antialiased font-bold ...">Block { data?.height }</h1>
          <div style={ { padding: 20 } } className="flex flex-col ...">
            <p className="font-mono font-medium leading-normal ...">This block was mined on { date } </p>
            <p className="font-mono font-medium leading-normal ...">The Block rewards, also known as the Coinbase reward, were sent to this <Link to={ "/address/" + miner }>address</Link> </p>
          </div>
          <div className="flex flex-col p-3">
            <div className="divide-y-2 divide-solid  divide-black divide-opacity-10 ">
              {/* <div className="flex flex-row  flex-wrap items-center ...">
                <div className="font-sans text-lg p-3 w-40 ... ">Id</div>
                <div className="font-sans text-normal p-3 ...">{ data.height }</div>
              </div> */}
              <div className="flex flex-row  flex-wrap items-center ...">
                <div className="font-sans text-lg p-3 w-40 ... " >Hash</div>
                <div className="font-sans text-normal p-3 ...">{ data?.hash }</div>
              </div>
              <div className="flex flex-row  flex-wrap items-center ...">
                <div className="font-sans text-lg p-3 w-40 ... ">PrevHash</div>
                <div className="font-sans text-normal p-3 ...">{ data?.prevHash }</div>
              </div>
              <div className="flex flex-row  flex-wrap items-center ...">
                <div className="font-sans text-lg p-3 w-40 ... ">TimeStamp</div>
                <div className="font-sans text-normal p-3 ...">{ date }</div>
              </div>
              <div className="flex flex-row  flex-wrap items-center ...">
                <div className="font-sans text-lg p-3 w-40 ... ">Miner</div>
                <div className="font-sans text-normal p-3 ...">{ miner.slice(0, 40) + "..." }</div>
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
          { data.transactions !== undefined && data.transactions !== null ? <div className="p-5">
            <Carousel showThumbs={ false }>
              { data?.transactions?.map(tx => {

                return (
                  <div className="p-8 mx-auto rounded-lg shadow-xl items-center content-center bg-purple-600 ... ">
                    <div className="flex flex-col items-center p-3">
                      <p className="font-sans text-2xl subpixel-antialiased font-medium ">Transaction</p>
                      <p className="font-sans text-lg subpixel-antialiased font-medium"> { tx?.id?.slice(0, 20) + "..." }</p>
                    </div>
                    { tx?.txOuts?.map(txout => {
                      return (
                        <div className="flex flex-col p-2">
                          <div>Address: { txout?.address?.slice(0, 20) + "..." }</div>
                          <div>Amount: { txout?.amount }</div>
                        </div>
                      )
                    }) }
                  </div>
                )
              }) }
              <div className="p-20 rounded-lg bg-purple-600 hover:bg-red-400 ...">9</div>
            </Carousel>


          </div> : null }




        </Info>
        }
      </Main>
    </Layout>
  )
}

export default Block

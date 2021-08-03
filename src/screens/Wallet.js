import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import { ImageLoad } from "../components/ImageLoad"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faSyncAlt, faArrowDown, faCheck } from "@fortawesome/free-solid-svg-icons"
import { useSpring, a, Spring } from '@react-spring/web'
import styles from '../components/styles.module.css'
import { GetWindowDimensions } from "../utils"
import ReactNotification, { store } from 'react-notifications-component'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Notification from "../components/Notif"
import MiningIcon from '../hoe.svg';
import axios from "axios"
import { useForm } from "react-hook-form";

const Main = styled.div`
  top: 0;
  left: 0;
`
const Card = styled(a.div)`
position: absolute;
  width: 50%;
  @media only screen and (max-width:780px){
    width: 80%;
  }
`
const CardHeader = styled.div``
const CardBody = styled.div`
  min-height: ${props => props.height}px ;
`
const Decoration = styled.div`
  top:50%; 
  left: 50%;
  width: 20%;  
  height: 20%;
`

const LS_ADDRESS = "Address"

const Wallet = () => {
  const { register, handleSubmit, getValues, setValue } = useForm();

  const [flipped, setFlipped] = useState(false)
  const [pressed, setPressed] = useState(false);

  const [address, setAddress] = useState(localStorage.getItem(LS_ADDRESS))
  const [addressEdit, setAddressEdit] = useState(false)

  const [balance, setBalance] = useState(0)

  const [newCard, setNewCard] = useState()

  const [disabled, setDisabled] = useState(false)

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1200px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })
  const [cardWidth, setCardWidth] = useState()



  useEffect(() => {

    setCardWidth(GetWindowDimensions().width > 780 ? GetWindowDimensions().width * 0.5 / 2.58 : GetWindowDimensions().width * 0.8 / 2.58)

    function handleResize() {
      setCardWidth(GetWindowDimensions().width > 780 ? GetWindowDimensions().width * 0.5 / 2.58 : GetWindowDimensions().width * 0.8 / 2.58)
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const FlipCard = () => {
    setPressed(true)
    setFlipped(state => !state)
    setPressed(false)
  }

  useEffect(() => {
    if (address !== undefined && address !== null) {
      localStorage.setItem(LS_ADDRESS, address)
      GetBalance()
    }
  }, [address])

  const GetBalance = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/balance/' + address + '?total=true'
      );
      // let getBalanceResponse = [...response.data];

      setBalance(response?.data?.balance)
    } catch (e) {
      console.log(e)
    }

  }

  const GenerateNewKey = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/createkey'
      )
      setNewCard(response?.data)
    } catch (e) {
      console.log(e)
    }
  }

  const MakeTransaction = async (privkey, to, amount) => {
    try {
      let transaction_data = JSON.stringify({
        privkey: privkey,
        to: to,
        amount: amount
      })
      axios.post(`http://127.0.0.1:4000/transactions`, transaction_data)
        .then(res => {
          console.log(res);
          console.log(res.data)
        })
        .catch(error => console.log(error));

    } catch (e) {
      console.log(e)
    }
  }

  const MiningBlock = async () => {
    try {
      let miningblock_data = JSON.stringify({
        from: address
      })
      axios.post(`http://127.0.0.1:4000/blocks`, miningblock_data)
        .then(res => {
          console.log(res);
          console.log(res.data)
        })
        .catch(error => console.log(error));

    } catch (e) {
      console.log(e)
    }
  }

  const onTransaction = async () => {
    setDisabled(true)
    const { tx_from, tx_amount, tx_to } = getValues();
    console.log(tx_from, tx_amount, tx_to);
    setDisabled(false)
  }

  const onChangeAddress = async () => {
    console.log("noaoaosodofosaodfo ")
    const { input_address } = getValues();
    console.log(input_address)
    setAddress(input_address)
    setAddressEdit(false)
  }

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };


  const SpringButton = () => {
    return (
      <Spring from={ { scale: 1 } } to={ { scale: pressed ? 0.8 : 1 } }>
        { ({ scale }) => (
          <a.button
            style={ {
              transform: scale.interpolate(scale => `scale(${scale})`)
            } }
            className=" p-3 bg-yellow-300 text-blue-800 rounded-full shadow-md"
            onClick={ () => FlipCard() }
          >
            <FontAwesomeIcon icon={ faSyncAlt } />
          </a.button>
        ) }
      </Spring>
    );
  }

  return (
    <>
      <ReactNotification />
      <Layout>
        <PageTitle title="Waleet" />
        <Main
          className={ `relative flex flex-col w-full min-h-screen max-h-screen font-sans items-center justify-center text-white` }>
          {/* <a.div 
      onClick={ () => set(state => !state) }

       style={ { opacity: opacity.to(o => 1 - o), transform } }
       className={ `${styles.c} ` } 
       > */}
          <div className="fixed bottom-5 right-5">
            <button
              className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              onClick={ () => MiningBlock() }
              style={ { boxShadow: "2px 2px 3px #999" } }
            >
              <div className="w-6 h-6 md:w-8 md:h-8 text-blue-900" >
                <ImageLoad image={ MiningIcon } />
              </div>
            </button>
          </div>

          <Card
            style={ { opacity: opacity.to(o => 1 - o), transform, display: flipped ? "none" : "flex", } }
            className={ `${styles.c} ` }

          >

            {/* hover:from-pink-500 hover:to-yellow-500 */ }
            <div
              className="w-full h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-xl shadow-2xl "
            >

              <CardHeader className="flex flex-row w-full items-center justify-between p-2 " >
                <div className="w-10 m-2">
                  <ImageLoad image={ "/ohpotato.png" } />
                </div>
                <div className="text-base">
                  <span className="font-semibold p-1">Balance</span>
                  <span className="font-medium p-1">{ balance } OPC</span>

                </div>
              </CardHeader>
              <CardBody className="relative p-6 flex flex-col items-start justify-end  z-0" height={ cardWidth }>

                { !addressEdit ? (
                  <>
                    <div className="text-lg ">
                      <span className="m-1">Address</span>
                      <span className="m-1">
                        <FontAwesomeIcon icon={ faPen } size="sm" onClick={ () => setAddressEdit(true) } />
                      </span>
                    </div>
                    <div className="text-sm break-all w-10/12 cursor-pointer">
                      <CopyToClipboard
                        text={ address }
                        onCopy={ () => {
                          store.addNotification({
                            ...Notification("Now Your Address is copied to your clipboard"),
                            container: "bottom-left",
                          })
                        } } >
                        <span>
                          {
                            
                            address !== undefined && address !== null ? address.slice(0, 30) + "..." : null
                          }
                        </span>
                      </CopyToClipboard>


                    </div>
                  </>
                ) : (

                  <div>
                    <form onSubmit={ handleSubmit(onChangeAddress) }>
                      <input
                        type="text"
                        name="input_address"
                        ref={ register({ required: true }) }
                        className="rounded-lg text-gray-800"
                        placeholder="Address"
                      />
                      <button
                        type="submit"
                        className="m-2 w-10 h-10 text-center bg-green-400 rounded-full"
                        disabled={ disabled }
                      >
                        <FontAwesomeIcon icon={ faCheck } />
                      </button>
                    </form>
                  </div>) }


              </CardBody>
              <div className=" absolute bottom-4 right-4 z-10">
                <SpringButton />
              </div>

            </div>
          </Card>
          <Card
            style={ {
              opacity,
              transform,
              rotateX: '180deg',
              display: !flipped ? "none" : "flex",
            } }
            className={ `${styles.c} ` } >
            <div className="w-full h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-xl shadow-2xl" >
              <CardHeader className="flex flex-row w-full items-center justify-between p-2 " >
                <div className="w-10 m-2">
                  <ImageLoad image={ "/ohpotato.png" } />
                </div>
                <div className="text-base">
                  <span className="font-semibold p-1">Balance</span>
                  <span className="font-medium p-1">{ balance } OPC</span>

                </div>
              </CardHeader>
              <CardBody className="relative p-6 flex flex-col items-start justify-end" >
                <form className="w-full relative " onSubmit={ handleSubmit(onTransaction) } onKeyDown={ (e) => checkKeyDown(e) } >
                  <div className="w-full flex flex-row justify-around items-center text-lg p-2">
                    <span className="m-1">From</span>

                    <input
                      type="text"
                      className="rounded text-gray-800 shadow-md"
                      placeholder="Your Private Key"
                      name="tx_from"
                      ref={ register({ required: true }) }
                    />
                  </div>
                  <div className="w-full flex flex-row justify-around items-center text-lg p-2">
                    <FontAwesomeIcon icon={ faArrowDown } />
                    <input
                      type="text"
                      className=""
                      name="tx_amount"
                      ref={ register({ required: true }) }
                    />
                  </div>
                  <div className="w-full flex flex-row justify-around items-center text-lg p-2">
                    <span className="m-1">To</span>
                    <input
                      type="text"
                      className="rounded text-gray-800 shadow-md"
                      placeholder="Address"
                      name="tx_to"
                      ref={ register({ required: true }) }
                    />
                  </div>
                  <div className="w-full flex flex-row justify-around items-center text-lg p-2">
                    <input
                      className="bg-blue-500 p-3 m-2 rounded-full shadow-lg"
                      type="submit"
                      value="send"
                    />
                  </div>
                </form>

              </CardBody>

            </div>
            <div className=" absolute bottom-4 right-4 ">
              <SpringButton />
            </div>

          </Card>

        </Main>
      </Layout>
    </>
  )
}

export default Wallet

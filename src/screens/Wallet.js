import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import { ImageLoad } from "../components/ImageLoad"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faSyncAlt, faExchangeAlt } from "@fortawesome/free-solid-svg-icons"
import { useSpring, a, Spring } from '@react-spring/web'
import styles from '../components/styles.module.css'
import { GetWindowDimensions } from "../utils"
import ReactNotification, { store } from 'react-notifications-component'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Notification from "../components/Notif"


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

const Wallet = () => {
  const [flipped, setFlipped] = useState(false)
  const [pressed, setPressed] = useState(false);
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
    setFlipped(state => !state)
    setPressed(true)
  }

  const SpringButton = () => {
    return (
      <Spring native from={ { scale: 1 } } to={ { scale: pressed ? 0.8 : 1 } }>
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

  // axios({
  //   method: 'post',
  //   url: '/user/12345',
  //   data: {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   }
  // });
  return (
    <Layout>
      <PageTitle title="Waleet" />
      <Main
        className={ `relative flex flex-col w-full min-h-screen max-h-screen font-sans items-center justify-center text-white` }>
        {/* <a.div 
      onClick={ () => set(state => !state) }

       style={ { opacity: opacity.to(o => 1 - o), transform } }
       className={ `${styles.c} ` } 
       > */}

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
                <span className="font-medium p-1">100 OPC</span>

              </div>
            </CardHeader>
            <CardBody className="relative p-6 flex flex-col items-start justify-end  z-0" height={ cardWidth }>
              <div className="text-lg ">
                <span className="m-1">Address</span>
                <span className="m-1">
                  <FontAwesomeIcon icon={ faPen } size="sm" onClick={ () => { console.log("erun") } } />
                </span>
              </div>
              <div className="text-sm break-all w-10/12 cursor-pointer">
                <CopyToClipboard text={ "f849a3071c9abfc4705728e44de9cd0f515f212u3o4124" } onCopy={ () => {
                  store.addNotification({
                    ...Notification("Now Your Address is copied to your clipboard"),
                    container: "bottom-left",

                  })
                } } >
                  <span>f849a3071c9abfc4705728e44de9cd0f515f23...</span>
                </CopyToClipboard>

              </div>


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
                <span className="font-medium p-1">100 OPC</span>

              </div>
            </CardHeader>
            <CardBody className="relative p-6 flex flex-col items-start justify-end " >
              <div className="w-full flex flex-row justify-around items-center text-lg p-2">
                <span className="m-1">From</span>
                <input type="text" class="rounded text-gray-800" placeholder="Your Private Key" />
              </div>
              <div className="w-full flex flex-row justify-around items-center text-lg p-2">
                <span className="m-1">To</span>
                <input type="text" class="rounded text-gray-800" placeholder="Address" />
              </div>
              <div className="w-full flex flex-row justify-around items-center text-lg p-2">
                <button>SEND</button>
              </div>


            </CardBody>

          </div>
          <div className=" absolute bottom-4 right-4 ">
            <SpringButton />
          </div>

        </Card>

      </Main>
    </Layout>
  )
}

export default Wallet
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"
import { ImageLoad } from "../components/ImageLoad"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`


const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: #1e4151 !important;
  margin-right: 10px;
`

const Titles = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  @media only screen and (max-width: 580px){
    flex-direction :column;

  }
`

const ImageCon = styled.div`
  max-width: 400px;
  padding: 20px;
  img {
    width: 100%;
  }
`

const Info = styled.span`
  font-size: 24px;
  font-weight: 300;
  color: #1e4151 !important;
  padding: 10px;
  max-width: 90%;
  word-break: break-all; 
  word-wrap: break-word;
  @media only screen and (max-width: 580px){
    font-size: 20px;
    max-width: 80%;
  }
`

const Btns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

const Button = styled.button`
  padding: 15px 20px;
  border-radius: 10px;
  border: none;
  border: 1px solid #1e4151;
  color: ${props => props.t};
  background-color: ${props => props.bg};
  font-size: 18px;
  font-weight: 500;
`

const MarginRight = styled.span`
  margin-right: 5px;
`



const Home = () => {
    return (
        <Layout>
            <PageTitle title="OhPotato" />
            <div className="w-full min-h-screen flex flex-col items-center justify-center">
                <div className="w-full h-10"></div>
                <Main>
                    <Titles>
                        <Title>1 OhPotatoCoin = </Title>
                        <Title> 1 오감자</Title>
                    </Titles>
                    <ImageCon>
                        <ImageLoad image={ "/ohpotato-icon.png" } />
                    </ImageCon>

                    <Info>Ohpotato coin is open source p2p digital currency, made by Yoonhero06</Info>
                    <Btns>
                        <Link to="/explorer">
                            <Button bg={ "#1e4151" } t={ "white" } className="m-2">Get Started Now</Button>
                        </Link>
                        <a href={ "https://github.com/yoonhero/ohpotatocoin" } >
                            <Button bg={ "#fdfcdc" } t={ "#1e4151" } className="m-2">

                                <MarginRight><FontAwesomeIcon icon={ faGithub } /></MarginRight>
                                <span>Source</span>
                            </Button>
                        </a>

                    </Btns>

                </Main>
            </div>

        </Layout>
    )
}

export default Home

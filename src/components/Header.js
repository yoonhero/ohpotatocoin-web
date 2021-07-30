import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ImageLoad } from "./ImageLoad";

const SHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color:#1e4151 !important;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: 0.1s;
`;

const Wrapper = styled.div`
  max-width: 900px;
  width: 100%;
  display: flex;
  justify-content:space-between;
  align-items: center;
  @media only screen and (max-width: 580px){
    justify-content:space-around;
  }
`;

const Column = styled.div`

  align-items: center;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Icon = styled.span`
  text-decoration: none;
  padding: 15px 10px;
  border-radius: 25px;
  margin-left: 10px;
  
  &:hover{  
    /* background: #ff9500; */
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    /* text-decoration: underline #014f86; */
    span {
      color: rgba(255,255,255,0.8);
      cursor: pointer;
    }    
  }

`;

const Logo = styled.p`
  font-size: 20px;
  padding: 10px;
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  @media only screen and (max-width: 580px){
    font-size: 18px;
  }
  img {
    width: 40px; height: 40px;
  }
`;

const Text = styled.span`
  font-size: ${props => String(props.size)}px;
  font-weight: 500;
  @media only screen and (max-width: 580px){
    font-size: 16px;
  }
`


export const Header = () => {
  const [padding, setPadding] = useState("10px 0px")
  const [fontsize, setFontsize] = useState(18)
  const [logo, setLogo] = useState(false)

  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
      setPadding("0px 0px")
      setFontsize(13)
      setLogo(true)
    } else {
      setPadding("10px 0px")
      setFontsize(18)
      setLogo(false)
    }
  }
  return (
    <SHeader style={ { padding } }>
      <Wrapper>
        <Column>
          <span>
            <Link to="/">
              <Logo className="ourlogo" style={ { fontSize: fontsize + 4 } }>
                { !logo ? "오감자코인" : "OPC" }
              </Logo>

            </Link>
          </span>
        </Column>
        <Column>
          <Icons>

            <Icon>
              <Link to="/explorer">
                <Text size={ fontsize }>Explorer</Text>
              </Link>
            </Icon>
            <Icon>
              <Link to="/wallet">
                <Text size={ fontsize }>Wallet</Text>
              </Link>
            </Icon>
          </Icons>

        </Column>
      </Wrapper>
    </SHeader>
  );
};

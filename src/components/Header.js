import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SHeader = styled.header`
  width: 100%;
  background-color:#1e4151 !important;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
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
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  @media only screen and (max-width: 580px){
    font-size: 18px;
  }
`;

const Text = styled.span`
  font-size: 18px;
  font-weight: 500;
  @media only screen and (max-width: 580px){
    font-size: 16px;
  }
`


export const Header = () => {
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <span>
            <Link to="/">
              <Logo className="ourlogo">오감자코인</Logo>

            </Link>
          </span>
        </Column>
        <Column>
          <Icons>

            <Icon>
              <Link to="/explorer">
                <Text>Explorer</Text>
              </Link>
            </Icon>
            <Icon>
              <Link to="/wallet">
                <Text>Wallet</Text>
              </Link>
            </Icon>
          </Icons>

        </Column>
      </Wrapper>
    </SHeader>
  );
};

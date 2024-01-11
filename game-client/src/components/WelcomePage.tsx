import React from 'react'
import styled from 'styled-components'
import { Button, Typography, Flex } from 'antd';

const { Title } = Typography;

function WelcomePage() {
  return (
    <Background>
    <Wrapper>
      <Flex style={boxStyle} justify="center" align="center" vertical>
        <Title>Welcome to Ganymede</Title>
          <Flex justify="center" align="center" gap="middle">
          <Button >
            Login
          </Button>
          <Button>
            Play
          </Button>
          </Flex>
      </Flex>
    </Wrapper>
    </Background>
  )
}

export default WelcomePage

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 200,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

const Wrapper = styled.div`
  background: #125554;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 5px #0000006f;
`
const Background = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
`

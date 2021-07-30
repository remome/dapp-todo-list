import React, { useState } from "react";
import { Row, Col, Button, Modal } from "antd";

import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

const WP = () => {
    
    const [connector, setConnector] = useState(false)

    const connectProvider = () => {
        // Create WalletConnect Provider
        return new WalletConnectProvider({
            rpc: {
                1: "https://mainnet.mycustomnode.com",
                3: "https://ropsten.mycustomnode.com",
                100: "https://dai.poa.network",
                25925: "https://rpc-testnet.bitkubchain.io"
            }
        })
    }

    const handleConnectWallet = async () => {
        
        try {

            const provider = await connectProvider()
            
            if (!provider.connected) {
                await provider.enable()
                await provider.request()
                setConnector(true)
            }

            // const web3 = new Web3(provider)
            // const web3accounts = await web3.eth.getAccounts()
            // console.log('web3accounts', web3accounts)

        } catch (error) {
            console.log(error)
        }  
    }

    const handleDisconnectWallet = async () => {
        try {
            const provider = await connectProvider()
            provider.disconnect()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const provider = connectProvider()
    const connecter = provider.connector // Is this.wc in file web3-provider class WalletConnectProvider
    // if (provider.connected) {
        console.log(provider)
        console.log(provider.connector)
        console.log(connecter._sessionStorage.getSession())
    // }

    return(
        <>
        <Row>
          <Col span={24}>
            <h1>Account: {} </h1>
            {/* { data.account === null 
            ? <><Button onClick={ handleConnectWallet }><p>Connect Wallet</p></Button></>
            : <><Button onClick={ handleDisconnectWallet }><p>Disconnect Wallet</p></Button></>
            } */}
            <><Button onClick={ handleConnectWallet }><p>Connect Wallet</p></Button></>
            <><Button onClick={ handleDisconnectWallet }><p>Disconnect Wallet</p></Button></>
          </Col>
        </Row>
        </>
    )
}

export default WP;
import React, { useState } from "react";
import { Row, Col, Button, Modal } from "antd";

import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

// Create WalletConnect Provider
const provider = new WalletConnectProvider({
    rpc: {
        25925: "https://rpc-testnet.bitkubchain.io"
    },
    qrcode: false
});

// console.log(provider.connector)

provider.connector.on("display_uri", (err, payload) => {
    const uri = payload.params[0];
    console.log(uri)
    // CustomQRCodeModal.display(uri);
})

const WP = () => {
    
    const [connector, setConnector] = useState(false)
    const [accounts, setAccount] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
  
    const handleOk = () => {
        setIsModalVisible(false)
    }
  
    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleConnectWallet = async () => {

        // console.log(provider.connector)
        setIsModalVisible(true)

        if (!provider.connected) {
            await provider.enable()
            setConnector(true)
        }

        const web3 = new Web3(provider)
        const web3accounts = await web3.eth.getAccounts()
        setAccount(web3accounts)

        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
            setAccount(accounts)
            console.log(accounts);
        });
        
        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
            console.log(chainId);
        });
        
        // Subscribe to session disconnection
        provider.on("disconnect", (code, reason) => {
            console.log(code, reason);
            provider.disconnect()
        })
    }

    // const loadAccount = async () => {
    //     console.log('dev')
    //     if (!provider.connected) {
    //         await provider.enable()
    //         setConnector(true)
    //     }
    //     const web3 = new Web3(provider)
    //     const web3accounts = await web3.eth.getAccounts()
    //     console.log('account', web3accounts)
    //     setAccount(web3accounts)
    // }

    const handleDisconnectWallet = () => {
        // console.log(connector)
        provider.disconnect()
        window.location.reload()
    }

    // if(accounts === null) loadAccount()

    return(
        <>
        <Row>
          <Col span={24}>
            <h1>Account: { accounts }</h1>
            { accounts === null 
            ? <><Button onClick={ handleConnectWallet }><p>Connect Wallet</p></Button></>
            : <><Button onClick={ handleDisconnectWallet }><p>Disconnect Wallet</p></Button></>
            }
            <>
            <Modal title="QR Wallet" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
            </Modal>
            </>
          </Col>
        </Row>
        </>
    )
}

export default WP;
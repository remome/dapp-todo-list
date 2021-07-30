import { React, useState } from "react";
import { Row, Col, Button, Card } from "antd";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";


const INITIAL_STATE = {
    connector: null,
    fetching: false,
    connected: false,
    chainId: 1,
    showModal: false,
    pendingRequest: false,
    uri: "",
    accounts: [],
    address: "",
    result: null,
    assets: [],
}

const ST = () => {

    const [connect, setConnector] = useState(INITIAL_STATE)
    const [data, setData] = useState(INITIAL_STATE)
    const [address, setAddress] = useState('')

    const walletConnectInit = async () => {
        // bridge url
        const bridge = "https://bridge.walletconnect.org"
    
        // create new connector
        const connector = new WalletConnect({ 
          bridge, 
          qrcodeModal: QRCodeModal
        })
    
        await setConnector({ connector })
    
        // check if already connected
        if (!connector.connected) {
          // create new session
          await connector.createSession()
        }
    
        // subscribe to events
        await subscribeToEvents()
    }

    const subscribeToEvents = () => {
        const { connector } = connect
    
        if (!connector) {
          return;
        }

        // console.log(connector)
    
        connector.on("session_update", async (error, payload) => {
          console.log(`connector.on("session_update")`)
          // console.log(payload)
    
          if (error) {
            throw error
          }
    
          const { chainId, accounts } = payload.params[0]

          onSessionUpdate(accounts, chainId)
        })
    
        connector.on("connect", (error, payload) => {
          console.log(`connector.on("connect")`, )
    
          if (error) {
            throw error
          }
    
          onConnect(payload)
        })
    
        connector.on("disconnect", (error, payload) => {
            console.log(`connector.on("disconnect")`)
        
            if (error) {
                throw error
            }
        
            onDisconnect()
        })
    
        if (connector.connected) {
          const { chainId, accounts } = connector
          const address = accounts[0]
          setConnector({
            connected: true,
            chainId,
            accounts,
            address,
          });
          onSessionUpdate(accounts, chainId);
        }
    
        setConnector({ connector })
      }

      const killSession = async () => {
        const { connector } = connect
        if (connector) {
          connector.killSession()
        }
        console.log('kill session')
        resetApp()
      }

      const resetApp = async () => {
        await setConnector({ ...INITIAL_STATE })
        window.location.reload()
      }

      const onConnect = async (payload) => {
        const { chainId, accounts } = payload.params[0]
        const address = accounts[0]
        await setConnector({
          connected: true,
          chainId,
          accounts,
          address,
        })
        await setAddress(address)
      }

      const onDisconnect = async () => {
        console.log('disconnect')
        await resetApp()
      }

      const onSessionUpdate = async (accounts, chainId) => {
        const address = accounts[0]
        await setConnector({ chainId, accounts, address })
        await setAddress(address)
      }
    // console.log(connect.connector._accounts)

    return(
        <>
        <Row>
          <Col span={24}>
            <p>Connect: {address}</p>
            <p>Address: {address}</p>
          </Col>
          <Col span={24}>
            {!address ? (
              <Button onClick={walletConnectInit}>
                  Connect to WalletConnect
              </Button>
            ) : (
              <>
                <Button onClick={killSession}>
                    Disconnect to WalletConnect
                </Button>
              </>
            )}
          </Col>
        </Row>
        </>
    )
}

export default ST;
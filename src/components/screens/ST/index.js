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

    if(connect.connector) console.log(connect.connector._accounts[0])

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
    
        connector.on("session_update", async (error, payload) => {
          console.log(`connector.on("session_update")`)
    
          if (error) {
            throw error
          }
    
          const { chainId, accounts } = payload.params[0]
          onSessionUpdate(accounts, chainId)
        })
    
        connector.on("connect", (error, payload) => {
          console.log(`connector.on("connect")`)
    
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

      const resetApp = async () => {
        await setConnector({ ...INITIAL_STATE })
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
      }

      const onDisconnect = async () => {
        await resetApp()
      }

      const onSessionUpdate = async (accounts, chainId) => {
        const address = accounts[0]
        await setConnector({ chainId, accounts, address })
      }

    return(
        <>
        <Row>
          <Col span={24}>
              <Button onClick={walletConnectInit}>
                  Connect to WalletConnect
              </Button>
          </Col>
        </Row>
        </>
    )
}

export default ST;
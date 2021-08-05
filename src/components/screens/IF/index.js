import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { BitkubProvider } from "./bitkubProvider";

const onConnect = async () => {
    const web3 = new BitkubProvider()
    // const web3 = BitkubProvider()

    // const connect = await web3.connected
    console.log(web3)
    // let eth_account = await web3.eth.getAccounts()
    // console.log('web3 provider', eth_account)

    // const netId = await web3.eth.net.getId()
    // console.log('web3 provider', netId)

    // const ChainnId = await web3.eth.getChainId()
    // console.log('web3 provider', ChainnId)

    // if (connect) {
    //   let bk_account = await web3.bkc.getAccounts()
    //   console.log('-----------------------------')
    //   console.log('bitkub provider', bk_account)
      
    //   let eth_account = await web3.eth.getAccounts()
    //   console.log('-----------------------------')
    //   console.log('web3 provider', eth_account)
    // }

    // let eth_account = await web3eth.eth.getAccounts()
    // console.log('eth account', eth_account[0])

    // const getPrimaryKey = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     console.log('call app')
    //     resolve('99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342')
    //   }, 10000)
    // })

    // const netId = await getPrimaryKey.then(async(PrimaryKey) => {
    //   console.log(`primary_id: ${PrimaryKey}`)
    //   // if (PrimaryKey) {
    //   //   web3bitkub.eth.accounts.signTransaction({
    //   //     from: addressFrom,
    //   //     to: addressTo,
    //   //     value: web3.utils.toWei('100', 'ether'),
    //   //     gas: '4294967295'
    //   //   },
    //   //   PrimaryKey)
    //   // }
    //   if (PrimaryKey) return web3bitkub.eth.net.getId()
    // })

    // console.log(`primary_id: ${netId}`)

    // const createTransaction = await getPrimaryKey.then(async(PrimaryKey) => {
    //   console.log(`primary_id: ${PrimaryKey}`)
    //   if (PrimaryKey) {
    //     web3bitkub.eth.accounts.signTransaction({
    //       from: addressFrom,
    //       to: addressTo,
    //       value: web3.utils.toWei('100', 'ether'),
    //       gas: '4294967295'
    //     },
    //     PrimaryKey)
    //   }
    // })


    // let provider = new IFrameProvider({
    //   // How long to wait for the response, default 1 minute
    //   timeoutMilliseconds: 360000,
    //   // The origins with which this provider is allowed to communicate, default '*'
    //   // See postMessage docs https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    //   targetOrigin: '*',
    //   uri: "https://rpc-testnet.bitkubchain.io"
    // })

    // const web3_provider = new Web3(provider)
    // // let eth_account = await web3eth.eth.getAccounts()
    // const account = await web3_provider.eth.getAccounts()
    // // console.log(account)
    // console.log('event -----> ', web3_provider)

    // const web3eth = new Web3(window.ethereum)
    // await window.ethereum.enable()
    // let eth_account = await web3eth.eth.getAccounts()
    // console.log('return ', eth_account)



    // console.log('web3_provider ----> ', account)
  
  // console.log('isIFrame', provider.isIFrame)
  // console.log('currentProvider', provider.currentProvider)
  // await provider.enable()
  // await provider.send('eth_sign', [ 'Hello', 'World'])


  // Handle event send notifition
  // await provider.handleEventSourceMessage({ 
  //   data: {
  //     id: 7384935468262475,
  //     jsonrpc: '2.0',
  //     method: 'notification', 
  //     params: ['hello', 'world']
  //   }
  // })


  // await provider.sendAsync(
  //   { method: 'eth_sign', params: ['hello', 'world'] },
  //   (error, result) => {
  //     console.log(error, result)
  //   }
  // )

}

const IF = () => {

	const [stateAccount, setStateAccount] = useState('')

  const loadBlockchainData = async () => {
    // Loading app..
    console.log('app loading...')
    await loadWeb3()
  }

	const loadWeb3 = async () => {
		console.log('web3 loading...')
		const web3 = new BitkubProvider()
		const connect = await web3.connected
		if(!connect) {
			console.log('connect fail')
			const enable = await web3.enable
			if(enable) alert(enable)
		} else {
			console.log('connect success')
		}
	}

	const handleConnectWallet = async () => {
		try {
			const web3 = new BitkubProvider()
			const connect = await web3.connected
			if(!connect) {
				console.log('connect fail')
				const enable = await web3.enable // get connect qr wallet from bitkub
				if(enable) console.log('display qr code')
			} else {
				console.log('connect success')
				const web3accounts = await web3.bkc.getAccounts()
				console.log(web3accounts)
				if (web3accounts.length > 0) setStateAccount(web3accounts[0])
				else alert('Get account fail, please reconnect !')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleDisconnectWallet = async () => {
		try {
			const web3 = new BitkubProvider()
			await web3.disconnect
			window.location.reload()
		} catch (error) {
				console.log(error)
		}
	}

	// loadBlockchainData()

	return(
		<>
		<Row>
			<Col span={24}>
				<h1>Custom Provider</h1>
				<p>Account: { stateAccount }</p>
				<><Button onClick={ handleConnectWallet }><p>Connect Wallet</p></Button></>
				{/* <><Button onClick={ handleDisconnectWallet }><p>Disconnect Wallet</p></Button></> */}
			</Col>
		</Row>
		</>
	)
}

export default IF;
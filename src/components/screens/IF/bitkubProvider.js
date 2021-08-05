import Web3 from "web3";
export function BitkubProvider() {
  
  console.log('start connect bitkub provider ...')
  
  const web3http = new Web3('https://rpc-testnet.bitkubchain.io')

  var _this = web3http

  async function connectBitkub() {
    const handlerConnectBitkub = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('-----------------------------')
        console.log('wait to connect bitkub')
        resolve(true)
      }, 1000)
    })

    const status = await handlerConnectBitkub.then(async(status) => {
      // console.log(`status: ${status}`)
      
      if (status) return status
    })
    return status
  }

  async function disconnectBitkub() {
    const handlerDisconnectBitkub = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('-----------------------------')
        console.log('wait to disconnect bitkub')
        resolve(true)
      }, 1000)
    })

    const status = await handlerDisconnectBitkub.then(async(status) => {
      // console.log(`status: ${status}`)
      
      if (status) return status
    })
    return status
  }

  async function enableBitkub() {
    const handlerEnableBitkub = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('-----------------------------')
        console.log('wait to enable bitkub')
        resolve(true)
      }, 1000)
    })

    const status = await handlerEnableBitkub.then(async(status) => {      
      if (status) return 'enable bitkub to generate qr'
    })
    return status
  }

  Object.defineProperty(web3http, 'connected', { value: connectBitkub() })

  // Object.defineProperty(web3http, 'disconnect', { value: disconnectBitkub() })

  Object.defineProperty(web3http, 'enable', { value: enableBitkub() })

	Object.defineProperty(web3http, 'bkc', {
    value: {
			async getAccounts() {
        const getAppPayload = new Promise((resolve, reject) => {
          setTimeout(() => {
            // console.log('-----------------------------')
            // console.log('wait to recive payload app')
            resolve('99B3C12287537E38C90A9219D4CB07')
          }, 1000)
        })

        const account = getAppPayload.then(async(AppPayload) => {
          console.log(`payload: ${AppPayload}`)
          console.log(web3http.eth)
          if (AppPayload) return _this.eth.getAccounts()
        })
				return account
			}
    }
	})

  // console.log(web3http.eth)

  return web3http
}
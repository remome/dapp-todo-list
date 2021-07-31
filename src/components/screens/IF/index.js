import React from "react";
import { Row, Col } from "antd";

import { IFrameEthereumProvider } from '@ethvault/iframe-provider'

const onConnect = async () => {

  let ethereum = new IFrameEthereumProvider(
    {
      // How long to wait for the response, default 1 minute
      timeoutMilliseconds: 2000,
      // The origins with which this provider is allowed to communicate, default '*'
      // See postMessage docs https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
      targetOrigin: 'https://myethvault.com',
    })
  
  console.log('isIFrame', ethereum.isIFrame)
  console.log('currentProvider', ethereum.currentProvider)
  // await ethereum.enable()
  // await ethereum.send('eth_sign', [ 'Hello', 'World'])
  await ethereum.sendAsync(
    { method: 'eth_sign', params: ['hello', 'world'] },
    (error, result) => {
      console.log(error, result)
    }
  )

}

const IF = () => {
    onConnect()
    return(
        <>
        <Row>
          <Col span={24}>
            <h1>Iframe Provider</h1>
            {/* <iframe
              src="https://crm.fs-sandbox.com/"
              width="100%"
              height="700"
              onLoad={onConnect}
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            /> */}
          </Col>
        </Row>
        </>
    )
}

export default IF;
// React
import React, { useState } from "react";
import { Link } from "react-router-dom";
// Javascript Web3
import Web3 from "web3";
// Todo List JSON
import JSONTodoListContract from "./TodoList.json";
// CSS
import { todolist } from "./todolist.css";
// Ant design
import { Card, Input, List, Typography } from "antd";
// Ant icons
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Search } = Input;

const network_address = '0x9637AC8843d1668F7c2E58649077DF7c00d804e6'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const TodoList = () => {
    // Defind State
    const [account, setAccount] = useState(false)
    const [todoList, setTodoList] = useState(false)

    const loadBlockchainData = async () => {
      // Loading app..
      console.log('app loading...')
      await loadWeb3()
      await loadAccount()
      await loadContract()
    }

    const loadWeb3 = async () => {
      console.log('web3 loading...')
      if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(Web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        try {
          // Request account access if needed
          await window.ethereum.enable()
          // Acccounts now exposed
          // web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(Web3.givenProvider)
        // Acccounts always exposed
        // web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }

      return true // web3Provider || false

    }

    const loadAccount = async () => {
      console.log('account loading...')
      const accounts = await window.web3.eth.getAccounts()
      setAccount(accounts[0])
    }

    const loadContract = async () => {
      // Create a JavaScript version of the smart contract
      const todoList = JSONTodoListContract
      var web3_contract = new window.web3.eth.Contract(JSON.parse(todoList), network_address)
      var data = await web3_contract.methods.tasks.call()
      alert('tets')
      // window.contract_todolist = TruffleContract(todoList)
      // window.contract_todolist.setProvider(window.web3)

      // setTodoList(web3_contract)

      // Hydrate the smart contract with values from the blockchain
      // let todo = await window.contract_todolist.deployed()
    }

    // const renderTasks = () => {
    //
    // }

    loadBlockchainData();

    return(
        <div className="">
            <Card className="home-card" title="TodoList" bordered={true}>
              <Link to="/"><ArrowLeftOutlined />Home</Link>
              <p>Account is {account}</p>
              <p>{todoList}</p>
              <Search
                placeholder="input your todo list... "
                enterButton="Search"
                size="large"
                onSearch={value => console.log(value)}
              />
              <h3 style={{ margin: '16px 0' }}>Active List</h3>
              <List
                size="large"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Card>
        </div>
    )
}

export default TodoList;

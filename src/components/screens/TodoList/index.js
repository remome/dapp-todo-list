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
import { Row, Col, Card, Input, List, Typography, Checkbox } from "antd";
// Ant icons
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Search } = Input;

const network_address = '0x85cC4575ed91f9053F8cd0e088099e7F819c3446' // old '0x9637AC8843d1668F7c2E58649077DF7c00d804e6'

const TodoList = () => {
    // Defind State
    const [account, setAccount] = useState(false)
    const [todoList, setTodoList] = useState(false)
    const [todoListAmount, setAmountTodoList] = useState(0)

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
        alert("Please connect to Metamask.")
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
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }

    }

    const loadAccount = async () => {
      console.log('account loading...')
      const accounts = await window.web3.eth.getAccounts()
      setAccount(accounts[0])
    }

    const loadContract = async () => {
        // Read file TodoList.json
        const todoList = JSONTodoListContract
        // Connect contract TodoList
        var web3_contract = new window.web3.eth.Contract(todoList.abi, network_address)
        // Get taskCount on contract TodoList
        var todoListAmount = await web3_contract.methods.taskCount().call()
        todoListAmount = parseInt(todoListAmount)
        // Set taskCount to state
        setAmountTodoList(todoListAmount)

        let tasks = []
        for(let i=1; i <= todoListAmount; i++) {
          // Get tasks by index on contract TodoList
          let task = await web3_contract.methods.tasks(i).call()
          // Generate tasks are array
          tasks = [...tasks, {
            id: task.id,
            content: task.content,
            completed: task.completed
          }]
        }
        // Set tasks to state
        setTodoList(tasks)
    }

    // Render loadBlockchainData First !!
    if(!todoList) loadBlockchainData()

    const handleCheckTodoList = (e) => {
      console.log(`checked = ${e.target.checked}`)
    }

    const generateCheckbox = (task) => {
      if (task.completed) return <Checkbox checked disabled>{task.content}</Checkbox>
      else return <Checkbox onClick={handleCheckTodoList}>{task.content}</Checkbox>
    }

    const renderListofTodoList = () => {
      console.log(`todolist amount: ${todoListAmount}`)

      if(todoList.length > 0) {
        return <List
          size="large"
          dataSource={todoList}
          renderItem={task => (
            <List.Item>
              <Typography.Text>{generateCheckbox(task)}</Typography.Text>
            </List.Item>
          )}
        />;
      } else {
        return <List size="large"/>
      }
    }

    return(
        <div>
          <Row>
            <Col span={24}>
              <Card className="home-card" title="TodoList" bordered={true}>
                <Link to="/"><ArrowLeftOutlined />Home</Link>
                <p><br></br><b>Account : </b> {account}</p>
                <Search
                  placeholder="input your todo list... "
                  enterButton="create"
                  size="large"
                  onSearch={value => console.log(value)}
                />
                <h3 style={{ margin: '16px 0' }}>Active List</h3>
                { renderListofTodoList() }
              </Card>
            </Col>
          </Row>
        </div>
    )
}

export default TodoList;

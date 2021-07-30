import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import styles from "./home.css";

const Home = () => {
    
    return(
        <>
            <Card className="home-card" title="Your Activity" bordered={true}>
                {/* <Link to="/todo-list"><p>Todo List</p></Link> */}
                {/* <Link to="/swap"><p>Swap Coins</p></Link> */}
                {/* <Link to="/st"><p>Stand Alone</p></Link> */}
                <Link to="/wp"><p>Web3 Provide</p></Link>
            </Card>
        </>
    )
}

export default Home;

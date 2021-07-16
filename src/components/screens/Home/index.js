import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import styles from "./home.css";

const Home = () => {
    return(
        <>
            <Card className="home-card" title="Your Activity" bordered={true}>
                <Link to="/todo-list"><p>Todo List</p></Link>
                <Link to="/swap"><p>Swap Coins</p></Link>
            </Card>
        </>
    )
}

export default Home;

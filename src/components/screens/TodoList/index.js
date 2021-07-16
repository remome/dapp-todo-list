import React from "react";
import { Card, Input } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { todolist } from "./todolist.css";

const TodoList = () => {
    return(
        <div className="">
            <Card className="home-card" title="TodoList" bordered={true}>
              <Link to="/"><ArrowLeftOutlined />Home</Link>
              <Input placeholder="input your todo list... " />
            </Card>
        </div>
    )
}

export default TodoList;

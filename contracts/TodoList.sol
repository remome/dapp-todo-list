pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks; // mapping(อันนี้ตือ key => อันนี้ struct Task) มาเก็บไว้ที่ tasks;

  constructor() public {
    createTask("check out bitkubchain.com");
    createTask("Task #1");
  }

  function createTask(string memory _content) public {
    taskCount ++; // create id for tasks
    tasks[taskCount] = Task(taskCount, _content, false);
  }

}

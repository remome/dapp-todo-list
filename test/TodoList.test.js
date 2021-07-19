const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed()
  })

  it('deploys successfully', async () => {
    const address = this.todoList.network_address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    // assert.notEqual(address, null)
    // assert.notEqual(address, undefined)
  })

  it('list tasks', async () => {
    const taskCount = await this.todoList.taskCount()
    const task = await this.todoList.tasks(taskCount)
    assert.equal(task.id.toNumber(), taskCount.toNumber())
    assert.equal(task.content, 'Task #1')
    assert.equal(task.completed, false)
    assert.equal(taskCount.toNumber(), 2)
  })



})

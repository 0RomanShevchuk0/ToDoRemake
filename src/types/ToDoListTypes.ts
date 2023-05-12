export interface IToDoList {
  id: string
  name: string
  tasks: ITask[]
}

export interface ITask {
  id: string
  name: string
  isDone: boolean
}

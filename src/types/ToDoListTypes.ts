export interface IToDoList {
	id: string
	title: string
	tasks: ITask[]
}

export interface ITask{
	id: string
	name: string
	isDone: boolean
}


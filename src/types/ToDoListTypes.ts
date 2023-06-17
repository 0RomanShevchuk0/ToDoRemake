export interface IToDoList {
  id: string
  name: string
  tasks: ITask[]
	location: {
		x: number
		y: number
		destination: {
			x: number | null
			y: number | null
		}
	}
}

export interface ITask {
  id: string
  name: string
  isDone: boolean
}

export type TasksFilterType = "All" | "Active" | "Completed"


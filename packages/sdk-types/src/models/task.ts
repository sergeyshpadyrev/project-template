import {
    IsEnum,
    IsString,
} from 'class-validator';

export enum TaskStatus {
    Done = 'done',
    InProgress = 'in-progress',
    Todo = 'todo',
}

export class Task {
    @IsString()
    id!: string;

    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsEnum(TaskStatus)
    status!: TaskStatus;
}
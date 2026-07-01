import { Type } from 'class-transformer';
import {
    IsArray,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Task } from './task';

export class Project {
    @IsString()
    id!: string;

    @IsString()
    name!: string;

    @IsArray()
    @Type(() => Task)
    @ValidateNested({ each: true })
    tasks!: Task[];
}

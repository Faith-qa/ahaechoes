export class UpdateTaskDto{
    readonly user: string;
    readonly title?: string;
    readonly status?: boolean;
    readonly details?: string;
    readonly dueDate?: Date;
    readonly time?: Date;
}
export class MessageModel {
    style: String;
    type: MessageType;
    content: String;
    title: String;

    constructor(init?:Partial<MessageModel>) {
        Object.assign(this, init);
    }
}

export enum MessageType {
    Success,
    Error,
    Info,
    Warning,
    Custom
}

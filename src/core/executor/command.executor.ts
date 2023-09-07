import { ChildProcessWithoutNullStreams } from "child_process";
import { ILogger } from "../handlers/stream-logger.interface";
import { ICommandExec } from "./command-types";

export abstract class ComandExecutor<Input> {
    constructor(private logger: ILogger) {}
    public async executor() {
        const input: any = await this.prompt();
        const command = this.build(input);
        const stream = this.spawn(command);
        this.processStream(stream, this.logger);
    }

    protected abstract prompt(): Promise<string>;
    protected abstract build(input: Input): ICommandExec;
    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: ILogger): void;

}
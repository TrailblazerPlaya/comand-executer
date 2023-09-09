import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { ComandExecutor } from "../../core/executor/command.executor";
import { ILogger } from "../../core/handlers/stream-logger.interface";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.types";
import { FileService } from "../../core/files/file.service";
import { PromptService } from "../../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { StreamHandler } from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends ComandExecutor<IFfmpegInput> {
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: ILogger) {
        super(logger);
    }
    
    protected async prompt(): Promise<IFfmpegInput>{
        const width = await this.promptService.input<number>('width', 'number');
        const height = await this.promptService.input<number>('height', 'number');
        const path = await this.promptService.input<string>('path', 'input');
        const name = await this.promptService.input<string>('name', 'input');
        return {
            width,
            height,
            path,
            name
        };
    }
    protected build({width, height, path, name}: IFfmpegInput): ICommandExecFfmpeg{
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        return {command : 'ffmpeg', args, output};    
    }
    protected spawn({output, command, args}: ICommandExecFfmpeg) : ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExist(output);
        return spawn(command, args);
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: ILogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }

}
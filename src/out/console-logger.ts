import { ChildProcessWithoutNullStreams } from "child_process";
import { ILogger } from "../core/handlers/stream-logger.interface";

export class ConsoleLogger implements ILogger {
    private static logger: ConsoleLogger;
    public static getInstace() {
        if(!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger();
        }
        return ConsoleLogger.logger;
    }

    log(...args: any): void {
        console.log(...args);
    }
    end(): void {
        console.log('Готово');
    }
    error(...args: any): void {
        console.log(...args);
    } 
}
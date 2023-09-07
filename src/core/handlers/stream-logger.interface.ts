export interface ILogger {
    log(...args: any): void;
    end(): void;
    error(...args: any): void;
    
}
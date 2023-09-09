import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor";
import { ConsoleLogger } from "./out/console-logger";

export class App {
	async run() {
		new FfmpegExecutor(ConsoleLogger.getInstace()).executor();
	}
}

const app = new App();
app.run();
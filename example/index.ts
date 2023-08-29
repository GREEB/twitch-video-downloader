import { join } from "path";
import { writeFileSync } from "fs";

import { VideoDownloader } from "./../src/video-downloader";
import { ensureDirectoryExists } from "./../src/utils/filesystem";

(async () => {
    try {
        const downloader = new VideoDownloader("https://www.twitch.tv/videos/800558240");

        downloader.on("fragment-downloaded", (file) => console.log(`${file}`));

        downloader.on("progress-download", (progress) => console.log(`Downloaded ${progress.toFixed(2)}%`));
        downloader.on("progress-transcode", (progress) => console.log(`Transcoded ${progress.toFixed(2)}%`));

        downloader.on("start-download", (e) => console.log(`Download started! on `, e));
        downloader.on("start-transcode", () => console.log(`Transcoded started!`));

        // Get all resolutions available for this video
        const resolutions = await downloader.getVideoResolutionsAvailable();

        // Donwload specific resolution
        const download = await downloader.download(resolutions[0]);

        // Information and path of downloaded hls files
        console.log(download);

    } catch (error) {
        console.log(error);
    }
})();

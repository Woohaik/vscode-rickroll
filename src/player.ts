import * as cp from "child_process";
import * as path from 'path';
const player = require('play-sound')();
const isWindows = process.platform === 'win32';
const windowsPath = path.join(__dirname, "/../audio/sounder.exe");

const playerAdapter = () => ({
    afplay: ['-v', 100],
    mplayer: ['-af', `volume=100`],
});



export const play = (): Promise<void> => {
    const rickPath = path.join(__dirname, "/../audio/never.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/vol', "100", rickPath]);
            resolve();
        } else {
            player.play(rickPath, playerAdapter(), (err: any) => {
                if (err) {
                    console.error("Error playing sound:", rickPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};
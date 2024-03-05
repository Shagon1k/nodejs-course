import os from "os";
import childProcess from "child_process";

const OS_TOP_CPU_PROCESS_COMMANDS = {
  WINDOWS:
    'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1"',
  POSIX: "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1",
};

const MIN_REFRESH_RATE = 10; // times per sec

const LOG_FILE_INTERVAL_MS = 60 * 1000; // 1 minute

const getOSTopCPUProcessCommand = () => {
  let topCPUCommand;
  switch (os.platform()) {
    case "win32":
      topCPUCommand = OS_TOP_CPU_PROCESS_COMMANDS.WINDOWS;
      break;
    case "darwin":
    case "linux":
      topCPUCommand = OS_TOP_CPU_PROCESS_COMMANDS.POSIX;
      break;
    default:
      throw new Error("OS is not supported.");
  }

  return topCPUCommand;
};

// Log to file in separate Node.js process to avoid affect to main process Event Loop
const logToFileProcess = childProcess.fork("./logToFile");

const logOneRow = (result: string) => {
  console.clear();
  console.log(result);
};

const runCommand = (
  command: string,
  minRefreshRate: number,
  logFileIntervalMs: number
) => {
  const minCommandIntervalMs = 1000 / minRefreshRate;
  let lastLogFileTime: number;

  (function runFunc() {
    const executionStartTime = Date.now();

    childProcess.exec(command, (error, stdout, stderr) => {
      const executionEndTime = Date.now();

      if (stdout) {
        const result = stdout.trim();
        // Log execution result using one row
        logOneRow(result);

        // Log to file if ~ log file interval passed
        if (
          !lastLogFileTime ||
          executionEndTime - lastLogFileTime > logFileIntervalMs
        ) {
          logToFileProcess.send(result);
          lastLogFileTime = Date.now();
        }
      }

      if (stderr) {
        console.error("Error during command execution.", stderr);
      }

      if (error !== null) {
        console.error("Unsuccessful run command.");
        throw error;
      }

      // Re-run based on min refresh rate: either rate achieved OR immediately if command execution lasts too long
      const executionTime = executionEndTime - executionStartTime;
      if (executionTime >= minCommandIntervalMs) {
        runFunc();
      } else {
        setTimeout(runFunc, minCommandIntervalMs - executionTime);
      }
    });
  })();
};

const topCPUProcessCommand = getOSTopCPUProcessCommand();
runCommand(topCPUProcessCommand, MIN_REFRESH_RATE, LOG_FILE_INTERVAL_MS);

import os from "os";
import childProcess from "child_process";

const OS_TOP_CPU_PROCESS_COMMANDS = {
  WINDOWS:
    'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1"',
  POSIX: "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1",
};

const MIN_REFRESH_RATE = 10; // times/sec

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

const logOneRow = (result: string) => {
  console.clear();
  console.log(result);
};

const runCommandWithMinRefreshRate = (
  command: string,
  minRefreshRate: number
) => {
  const minIntervalMs = 1000 / minRefreshRate;

  (function runFunc() {
    const startTime = Date.now();

    childProcess.exec(command, (error, stdout, stderr) => {
      logOneRow(stdout);

      if (error !== null) {
        throw new Error("Could not run command.");
      }

      const executionTime = Date.now() - startTime;

      console.log("Exec time: ", executionTime / 1000);

      if (executionTime > minIntervalMs) {
        runFunc();
      } else {
        setTimeout(runFunc, minIntervalMs - executionTime);
      }
    });
  })();
};

const topCPUProcessCommand = getOSTopCPUProcessCommand();
runCommandWithMinRefreshRate(topCPUProcessCommand, MIN_REFRESH_RATE);

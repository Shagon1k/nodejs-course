# Summary

Let's write our simplified version of the `top` CLI utility program. It provides a dynamic real-time view of the running system. Usually, this command shows the summary information of the system and the list of processes or threads currently managed by the \*nix kernel. Our goal is to show the most CPU-intensive process that's running on the system.

# Acceptance criteria

1. Program uses system shell command output (see Hints) to retrieve process name, CPU, and memory usage details.
2. Refresh rate is ten times per second.
3. The program uses only the standard library; any third-party modules are prohibited.
4. Each update will _NOT_ start from the new line. It is always displayed only in one row.
5. Once per minute program appends the output to the log file `activityMonitor.log` in the format `<unixtime> : <process info>`. If the file doesn't exist - the program creates it.
6. Program supports `Linux`, `macOS`, and `Windows` operating systems.

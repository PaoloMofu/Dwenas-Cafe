import { spawn } from "node:child_process";
spawn("npx", ["next", "dev", "-p", "3000"], { stdio: "inherit", shell: true });

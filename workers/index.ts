// Worker entry point – runs both the BullMQ reminder worker and the daily cron
import "./reminder.worker";
import cron from "node-cron";
import { execSync } from "child_process";

// Run daily cron at 8:00 AM Nepal time (UTC+5:45 = 02:15 UTC)
cron.schedule("15 2 * * *", () => {
  console.log("[Cron] Triggering daily tasks...");
  try {
    execSync("npx ts-node --compiler-options '{\"module\":\"CommonJS\"}' workers/daily.cron.ts", {
      stdio: "inherit",
    });
  } catch (err) {
    console.error("[Cron] Daily task failed:", err);
  }
});

console.log("[Workers] All workers and cron jobs initialized");

const { chromium } = require("playwright");

const seeds = [44,45,46,47,48,49,50,51,52,53];

// ✅ IMPORTANT: Replace this with the real base URL from your assignment page
// Example formats could be:
// https://sanand0.github.io/tdsdata/playwright/seed/44
// or https://.../?seed=44
const BASE = "PASTE_BASE_URL_HERE";

function buildUrl(seed) {
  // Edit ONE of these to match the given links:
  // return `${BASE}/${seed}`;
  return `${BASE}${seed}`;
}

function extractNumbers(text) {
  // grabs integers/decimals, including negatives
  const matches = text.match(/-?\d+(\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = buildUrl(seed);
    await page.goto(url, { waitUntil: "networkidle" });

    // get ALL tables text on the page
    const tablesText = await page.$$eval("table", (tables) =>
      tables.map((t) => t.innerText).join("\n")
    );

    const nums = extractNumbers(tablesText);
    const total = nums.reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed}: ${total}`);
    grandTotal += total;
  }

  console.log(`TOTAL_SUM_ALL_SEEDS=${grandTotal}`);
  await browser.close();
})();

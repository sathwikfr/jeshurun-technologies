import fs from "fs";
import readline from "readline";

async function extract() {
  const filePath = "C:\\Users\\sathw\\.gemini\\antigravity-ide\\brain\\8433721f-c3cf-4741-af98-008a46b7ab82\\.system_generated\\logs\\transcript_full.jsonl";
  
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let latestUserInput = null;

  for await (const line of rl) {
    try {
      const obj = JSON.parse(line);
      if (obj.type === "USER_INPUT") {
        latestUserInput = obj.content;
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  if (latestUserInput) {
    console.log("Found user input of length:", latestUserInput.length);
    // Write the raw HTML directly to scratch/prototype.html
    if (!fs.existsSync("scratch")) {
      fs.mkdirSync("scratch", { recursive: true });
    }
    fs.writeFileSync("scratch/prototype.html", latestUserInput, "utf-8");
    console.log("Successfully wrote user HTML to scratch/prototype.html");
  } else {
    console.log("Could not find USER_INPUT line");
  }
}

extract().catch(console.error);

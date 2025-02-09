import { createServer } from 'http';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from "crypto";

const PORT = 3002;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join( "data", "links.json");

const serveFile = async (res, filepath, contentType) => {
  try {
    const data = await readFile(filepath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - Page Not Found");
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Server Error");
    }
  }
};

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");

    // Check if the file is empty and return an empty object if true
    if (!data.trim()) {
      return {};
    }

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));  // Create the file if it doesn't exist
      return {};
    }
    // Log and rethrow other errors
    console.error("Error loading links:", error);
    throw error;
  }
};


const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links, null, 2), "utf-8");  // ✅ Fix 1
};

const server = createServer(async (req, res) => {
  console.log(req.url);

  if (req.method === 'GET') {
    if (req.url === '/') {
      return serveFile(res, path.join(__dirname, "public", "index.html"), "text/html");
    } else if (req.url === "/style.css") {
      return serveFile(res, path.join(__dirname, "public", "style.css"), "text/css");
    }else if(req.url==="/links"){
      const links = await loadLinks();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    }
    else{
      const links = await loadLinks();
      const shortCode = req.url.slice(1);
      if (links[shortCode]) {
        res.writeHead(302,{location : links[shortCode]})
        return res.end();
    }
       res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Shortened URL is not found");
    }
  }

  if (req.method === 'POST' && req.url === '/shorten') {
    const contentType = "application/json";  // ✅ Fix 3
    const links = await loadLinks();
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    
    req.on("end", async () => {
      try {
        const { url, shortCode } = JSON.parse(body);

        if (!url) {
          res.writeHead(400, { "Content-Type": "text/plain" });  // Bad Request
          return res.end("URL is required");
        }

        const finalShortcode = shortCode || crypto.randomBytes(4).toString("hex");

        if (links[finalShortcode]) {
          res.writeHead(409, { "Content-Type": "text/plain" });  // ✅ Fix 4 (Conflict error)
          return res.end("Shortcode already exists");
        }

        links[finalShortcode] = url; 
        await saveLinks(links);

        res.writeHead(200, { "Content-Type": contentType });
        res.end(JSON.stringify({ success: true, shortCode: finalShortcode }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid JSON data");
      }
    });

    return;  // Prevents sending another 404 response
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 - Page Not Found");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

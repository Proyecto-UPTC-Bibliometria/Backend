import fs from "fs";
import path from "path";

export default function saveToJson<T>(filename: string, data: T[] | T) {
  const dataJson = JSON.stringify(data, null, 2);
  const dirName = "./src/data";
  const fullPath = path.join(dirName, filename);

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  fs.writeFileSync(fullPath, dataJson);
}

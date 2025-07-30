import fs from "fs";
import path from "path";

export default function saveToJson<T>(filename: string, data: T[] | T) {
  const dataJson = JSON.stringify(data, null, 2);
  const pathName = "./src/data";
  const fullPath = path.join(pathName, filename);

  if (!fs.existsSync(pathName)) {
    fs.mkdirSync(pathName, { recursive: true });
  }

  fs.writeFileSync(fullPath, dataJson);
}

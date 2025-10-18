import compression from "compression";
import zlib from "zlib";
import { Request, Response } from "express";

export const compress = compression({
  threshold: 0,
  filter: (req: Request, res: Response) => {
    const type = res.getHeader("Content-Type");
    if (type && type.toString().includes("application/json")) {
      return true;
    }
    return false;
  },
  brotli: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 9,
    },
  },
  level: 9,
});

const prefijo = (nivel: string) => `[shell] ${nivel}`;

export const log = {
  info: (msg: string, data?: unknown) =>
    console.info(prefijo("info"), msg, data ?? ""),
  warn: (msg: string, data?: unknown) =>
    console.warn(prefijo("warn"), msg, data ?? ""),
  error: (msg: string, err?: unknown) =>
    console.error(prefijo("error"), msg, err ?? ""),
};

export const log = {
  info: (msg: string, data?: unknown) =>
    console.info(`[characters] ${msg}`, data ?? ""),
  error: (msg: string, err?: unknown) =>
    console.error(`[characters] ${msg}`, err ?? ""),
};

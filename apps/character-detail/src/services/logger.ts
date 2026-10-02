export const log = {
  info: (msg: string, data?: unknown) =>
    console.info(`[character-detail] ${msg}`, data ?? ""),
  error: (msg: string, err?: unknown) =>
    console.error(`[character-detail] ${msg}`, err ?? ""),
};

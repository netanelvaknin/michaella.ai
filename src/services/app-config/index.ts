export const getEnv = () => process.env.NEXT_PUBLIC_ENV || "development";

export const isDevEnv = () => getEnv() === "development";
export const isProdEnv = () => getEnv() === "production";

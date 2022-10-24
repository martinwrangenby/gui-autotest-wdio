declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_CONCURRENCY: number;
    }
  }
}

export {};

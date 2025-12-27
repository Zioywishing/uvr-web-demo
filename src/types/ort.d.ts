export interface Ort {
  env: {
    wasm: {
      wasmPaths: Record<string, string>;
      numThreads: number;
    };
    webgpu?: {
      device: unknown;
    } | null;
  };
  InferenceSession: {
    create(path: string, options?: unknown): Promise<Session>;
  };
  Tensor: new (type: string, data: Float32Array, dims: number[]) => Tensor;
}

export interface Session {
  inputNames: string[];
  run(inputs: Record<string, Tensor>): Promise<Record<string, { data: Float32Array }>>;
}

export interface Tensor {
  data: Float32Array;
}

declare global {
  interface Window {
    ort: Ort;
  }
}

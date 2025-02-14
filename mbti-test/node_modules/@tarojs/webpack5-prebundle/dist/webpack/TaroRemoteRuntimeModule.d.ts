import { RuntimeModule } from 'webpack';
import type { ChunkGraph, Compilation } from 'webpack';
export default class TaroRemoteRuntimeModule extends RuntimeModule {
    private platformType;
    compilation: Compilation;
    chunkGraph: ChunkGraph;
    constructor(platformType: string);
    getDepsMap(): {
        chunkToRemotesMapping: Record<string | number, (string | number)[]>;
        idToExternalAndNameMapping: {};
    };
    generate(): string;
    generateWeb(): string;
    generateMini(): string;
}

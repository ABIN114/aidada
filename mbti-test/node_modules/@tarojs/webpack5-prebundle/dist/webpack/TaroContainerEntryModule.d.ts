import ContainerPlugin from 'webpack/lib/container/ContainerPlugin';
declare const ContainerEntryModule: any;
type Exposes = ConstructorParameters<typeof ContainerPlugin>[0]['exposes'];
export default class TaroContainerEntryModule extends ContainerEntryModule {
    constructor(name: string, exposes: Exposes, shareScope: string);
    codeGeneration({ moduleGraph, chunkGraph, runtimeTemplate }: {
        moduleGraph: any;
        chunkGraph: any;
        runtimeTemplate: any;
    }): any;
}
export {};

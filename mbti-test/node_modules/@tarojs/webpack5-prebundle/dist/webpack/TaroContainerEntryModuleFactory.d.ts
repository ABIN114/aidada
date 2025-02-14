import type { Compilation } from 'webpack';
declare const ContainerEntryModuleFactory: any;
export default class TaroContainerEntryModuleFactory extends ContainerEntryModuleFactory implements MapValue<Compilation['dependencyFactories']> {
    create(data: any, callback: any): void;
}
export {};

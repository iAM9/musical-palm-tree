import { ModuleWithComponentFactories } from "@angular/core";

export interface Context {
    mood: string;
    personality(): void;
}
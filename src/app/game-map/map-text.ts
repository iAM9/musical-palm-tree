export interface MapText {
    mapLocation: number;
    text: string;
    dialogue: Dialogue[];
}

export interface Dialogue {
    option: number;
    txt: string;
}
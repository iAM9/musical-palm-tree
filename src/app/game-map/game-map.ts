export interface GameMap {
    mapPoints: MapPoint[];
}

export interface MapPoint {
    currentPosition: number;
    paths: Path[];
}

export interface Path{
    direction: string;
    newPosition: number
}
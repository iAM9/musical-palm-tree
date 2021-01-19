/**
 * The defaul interface for the Game Map
 */

export interface GameMap {
    mapPoints: MapPoint[];
}

export interface MapPoint {
    currentPosition: number;
    x: number;
    y: number;
    pathsFromCurrentPosition: Path[];
}

export interface Path{
    direction: string;
    pathPosition: number
    x: number;
    y: number;
}
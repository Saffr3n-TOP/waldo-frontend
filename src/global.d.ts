declare type Point = [number, number];
declare type Polygon = {
  _id: string;
  name: string;
};

declare type PointData = {
  clientX: number;
  clientY: number;
  offsetX: number;
  offsetY: number;
  windowWidth: number;
  windowHeight: number;
};

declare type ApiError = {
  status: number;
  message: string;
};

declare type ApiData = {
  message: string;
  start: number;
  end?: number;
  polygons?: {
    [id: string]: {
      _id: string;
      name: string;
      isFound: boolean;
    };
  };
};

declare type ApiJson = {
  error?: ApiError;
  data?: ApiData;
};

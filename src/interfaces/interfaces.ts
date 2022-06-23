export interface Employee {
  id: number;
  attributes: {
    avatar: string;
    firstName: string;
    lastName: string;
  };
  email: string;
  rgbColorArray: [number, number, number];
  relationships: {
    account: {
      data: {
        id: number;
      };
    };
  };
}

export interface Relationship {
  type: string;
  id: number;
  attributes: {
    email: string;
  };
}

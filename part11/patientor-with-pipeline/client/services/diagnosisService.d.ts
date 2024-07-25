import { Diagnosis } from "../types";
export declare const getAll: () => Promise<Diagnosis[]>;
export declare const getByCode: (code: string) => Promise<Diagnosis>;
declare const _default: {
    getAll: () => Promise<Diagnosis[]>;
    getByCode: (code: string) => Promise<Diagnosis>;
};
export default _default;

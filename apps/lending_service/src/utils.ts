import mongoose from "mongoose"

export type MongooseTypeMap = {
    String: string;
    Number: number;
    Date: Date;
    Buffer: Buffer;
    Boolean: boolean;
    Mixed: any;
    ObjectId: mongoose.Types.ObjectId;
    Array: Array<any>;
    Map: Map<string, any>;
    Decimal128: mongoose.Types.Decimal128;
};

export type SchemaDefinition = {
    [key: string]: { type: keyof MongooseTypeMap, required?: boolean } | keyof MongooseTypeMap;
};

export type SchemaToType<T extends SchemaDefinition> = {
    [Property in keyof T]: T[Property] extends { type: infer U, required: true }
        ? U extends keyof MongooseTypeMap ? MongooseTypeMap[U]
        : never
        : T[Property] extends { type: infer U }
        ? U extends keyof MongooseTypeMap ? MongooseTypeMap[U] | undefined
        : never
        : T[Property] extends keyof MongooseTypeMap
        ? MongooseTypeMap[T[Property]]
        : never;
};

export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

import { Schema, model } from 'mongoose';

interface IBrand {
    _id?: string;
    name: string;
}

const brandSchema = new Schema<IBrand>({
    _id: { type: Number, required: true },
    name: { type: String, required: true }
});

// Nom de la collection
const Brand = model<IBrand>('marques', brandSchema);

export {IBrand, Brand}
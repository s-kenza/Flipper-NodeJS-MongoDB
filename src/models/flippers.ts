import { Schema, model } from 'mongoose';
import { IBrand } from './brands';

interface IFlipper {
    name: string;
    price: number;
    stock: number;
    state?: string;
    date?: Date;
    note: number;
    images?: string[];
    brand: IBrand;
}

const flipperSchema = new Schema<IFlipper>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    state: { type: String, default: 'new' },
    date: { type: Date, default: Date.now },
    note: { type: Number, required: true },
    images: { type: [String] },
    brand: {
        _id: { type: Number },
        name: { type: String}
    }
});

// Nom de la collection
const Flipper = model<IFlipper>('flippers', flipperSchema);

export {Flipper}
import mongoose,{Schema} from "mongoose";
import Ireadings from "../interfaces/database/IReadings";

const readingsSchema = new Schema<Ireadings>({
    luz1: {
        type: Number, 
        required: false 
        },
    luz2: {
         type: Number, 
         required: false 
        },

    temp1: { 
        type: Number, 
        required: false 
        },
    hum1: { 
        type: Number, 
        required: false 
        },
    temp2: { 
        type: Number, 
        equired: false 

        },
    hum2: { 
        type: Number, 
        required: false
        },
    temp3: { 
        type: Number, 
        required: false 
    },
    hum3: { 
        type: Number, 
        required: false 
    },

    mq2_value: { 
        type: Number, 
        required: false 
    },
    mq2_voltage: { 
        type: Number, 
        required: false 
    },

    distancia: { 
        type: Number, 
        required: false 
    }
});

export const ReadingsModel = mongoose.model('Readings', readingsSchema);
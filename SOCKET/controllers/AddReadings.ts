import { ReadingsModel } from "../models/Readings";
import addRequest from "../interfaces/DTOS/AddRequest";

const addReadings = async (request: addRequest): Promise<void> => {
    try{
        const { luz1, luz2, temp1, hum1, temp2, hum2, temp3, hum3, distancia, mq2_value, mq2_voltage } = request
        await ReadingsModel.create({
            luz1,
            luz2,
            temp1,
            hum1,
            temp2,
            hum2,
            temp3,
            hum3,
            distancia,
            mq2_value,
            mq2_voltage
        })
    } catch(error) {
        console.error(error);
        throw new Error('Se produjo un error al interntar guardar la lectura de los sensores')
    }
}

export default addReadings;
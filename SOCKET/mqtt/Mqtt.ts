import client from "../config/MqttConexion";
import { Server } from "socket.io";
import SensorDataRequest from "../interfaces/DTOS/sensors/DataRequest";
import addReadings from "../controllers/AddReadings";
import { error } from "console";

const topic = "HongosHD";

export const setUpMqtt = (io: Server) => {
    const timeProceess = 15 * 1000; // 15 segundos en milisegundos

    let latestMessage: SensorDataRequest = {
        luz1: 0, luz2: 0, temp1: 0, hum1: 0, temp2: 0, hum2: 0, temp3: 0, hum3: 0, distancia: 0, mq2_value: 0, mq2_voltage: 0
    };

    client.on('connect', () => {
        console.log('Coneccion al broker MQTT establecido');

        client.subscribe(topic, (error) => {
            if(!error){
                console.log(`Suscrito al topic: ${topic}`);
            } else{
                console.error('Error al suscribirse al topic:', error);
            }
        })
    });

    client.on('message', (topic: string, message: Buffer) => {
        try {
            latestMessage = JSON.parse(message.toString()) as SensorDataRequest;
            console.log('Mensaje Recivido: ', {latestMessage});

            io.emit('graphics', latestMessage);
        } catch (error) {
            console.error('Error al procesar el mensaje', error);
        }
    });
}
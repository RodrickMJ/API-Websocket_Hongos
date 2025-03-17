import client from "../config/MqttConexion";
import { Server } from "socket.io";
import SensorDataRequest from "../interfaces/DTOS/sensors/DataRequest";
import addReadings from "../controllers/AddReadings";

const topic = "HongosHD";

export const setUpMqtt = (io: Server) => {
    const timeProceess = 3 * 60 * 1000; // 3 minutos en milisegundos (180,000 ms)

    let latestMessage: SensorDataRequest = {
        id_plant: '', luz1: 0, luz2: 0, temp1: 0, hum1: 0, temp2: 0, hum2: 0, temp3: 0, hum3: 0, distancia: 0, mq2_value: 0, mq2_voltage: 0
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

    let isProcessing = false;

    setInterval(async () => {
        if(isProcessing){
            console.log("Waiting for the end after operation... ");
            return;
        }

        isProcessing = true;
        
        console.log("Enviadon datos cada 2 minutos");

        try {
            await addReadings({
                id_plant: latestMessage.id_plant,
                luz1: latestMessage.luz1,
                luz2: latestMessage.luz2,
                temp1: latestMessage.temp1,
                hum1: latestMessage.hum1,
                temp2: latestMessage.temp2,
                hum2: latestMessage.hum2,
                temp3: latestMessage.temp3,
                hum3: latestMessage.hum3,
                distancia: latestMessage.distancia,
                mq2_value: latestMessage.mq2_value,
                mq2_voltage: latestMessage.mq2_voltage
            });

            io.emit('sensorDates', latestMessage);

        } catch (error) {
            console.error('Error al intentar guardar los datos:', error);
        } finally {
            isProcessing = false;
        }

    },timeProceess);

    client.on('error', (err) => {
        console.error("Error en el cliente MQTT:", err);
    });

    client.on("close", () => {
        console.log("Conexion Cerrada");
    });
}
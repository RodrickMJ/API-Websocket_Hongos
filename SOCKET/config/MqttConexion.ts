import 'dotenv/config';
import mqtt from "mqtt";

const brokerUrl:string = `mqtt://${process.env['IP_STANCIA']}` || 'localhost';
const userName:string = process.env['USERNAME_MQTT'] || 'rodrick';
const password:string = process.env['PASSWORD_MQTT'] || '0134102569';

const client = mqtt.connect(`${brokerUrl}:1883`, {
    userName,
    password
});

export default client;
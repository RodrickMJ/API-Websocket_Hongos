export default interface addRequest {
    id_plant: string,

    luz1: number,
    luz2: number,

    temp1: number,
    hum1: number,

    temp2: number,
    hum2: number,

    temp3: number,
    hum3: number,

    distancia: number,

    //evaluar los datos de mq102 al mq2
    mq2_value: number,
    mq2_voltage: number

}

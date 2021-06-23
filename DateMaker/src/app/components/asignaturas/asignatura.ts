export interface Curso {
    asignaturas : Asignatura[];
}

export interface Asignatura {
    nombre : string;
    codigo : string;
    h_practicas : number;
    h_teoricas : number;
    grupos : string;

}

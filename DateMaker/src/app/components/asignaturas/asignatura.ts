export interface Curso {
    asignaturas : Asignatura[];
}

export interface Asignatura {
    nombre : string;
    codigo : string;
    h_practicas : number | undefined;
    h_teoricas : number | undefined;
    grupos : string;

}

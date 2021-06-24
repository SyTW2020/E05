export interface Curso {
    asignaturas : Asignatura[];
}

export interface Asignatura {
    nombre : string;
    codigo : string;
    practicas : number;
    teoria : number;
    grupos : string;

}

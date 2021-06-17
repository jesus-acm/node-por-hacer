const Tarea = require('./tarea');


class Tareas {
    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach((tarea) =>{
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log()
        this.listadoArr.forEach((tarea, i) => {
            let completado = (tarea.completadoEn) 
                            ? 'Completado'.green 
                            : 'Pendiente'.red;

            console.log(`${ (i + 1).toString().green + '.'.green } ${ tarea.desc } :: ${ completado }`)
        });
    }

    listarPendientesCompletadas(completas = true){
        console.log()
        let index = 1;
        this.listadoArr.forEach((tarea) => {
            let completado = (tarea.completadoEn) 
                            ? 'Completado'.green 
                            : 'Pendiente'.red;

            if((tarea.completadoEn != null) == completas){
                console.log(`${ index.toString().green + '.'.green } ${ tarea.desc } :: ${ (tarea.completadoEn) ? tarea.completadoEn.green : completado }`)
                index++;
            }
        });
    }


    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
    
}

module.exports = Tareas;
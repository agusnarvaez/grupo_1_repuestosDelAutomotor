module.exports = (sequelize, dataTypes) => {
    let alias = 'Role'; //Asignamos Alias
    let cols = { //Asignamos columnas
        id: {
            type: dataTypes.INTEGER, //Indicamos tipo de dato
            primaryKey: true, //Indicamos si es clave primaria
            autoincrement: true // Indicamos si es autoincremental, en el caso de id lo es
        },
        first_name: {
            type: dataTypes.STRING
        },
        role: {
            type: dataTypes.STRING
        }
    };
    let config = { //Configuraciones adicionales de la tabla
        tableName: 'roles',
        timestamps: false
    }
    let Role = sequelize.define(alias, cols, config); //Creación de la tabla con sus datos
    return Role; //Exportamos modelo de tabla
}
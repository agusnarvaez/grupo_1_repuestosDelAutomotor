module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'; //Asignamos Alias
    let cols = { //Asignamos columnas
        id: {
            type: dataTypes.INTEGER, //Indicamos tipo de dato
            primaryKey: true, //Indicamos si es clave primaria
            autoincrement: true // Indicamos si es autoincremental, en el caso de id lo es
        },
        subcategory_name: {
            type: dataTypes.STRING
        }
    };
    let config = { //Configuraciones adicionales de la tabla
        tableName: 'categories',
        timestamps: false
    }
    let Category = sequelize.define(alias, cols, config); //Creación de la tabla con sus datos
    return Category; //Exportamos modelo de tabla
}
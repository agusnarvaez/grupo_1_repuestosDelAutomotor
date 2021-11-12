module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategories'; //Asignamos Alias
    let cols = { //Asignamos columnas
        id: {
            type: dataTypes.INTEGER, //Indicamos tipo de dato
            primaryKey: true, //Indicamos si es clave primaria
            autoincrement: true // Indicamos si es autoincremental, en el caso de id lo es
        },
        subcategory_name: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = { //Configuraciones adicionales de la tabla
        tableName: 'subcategories',
        timestamps: false
    }
    let Subcategorie = sequelize.define(alias, cols, config); //Creación de la tabla con sus datos

    // ***Asociaciones que tenga esta tabla***
    Subcategorie.associate = (models) => {
        Subcategorie.belongsTo( //Indicamos el tipod e relación
            models.Category, // Llamamos al modelo
            {
                as: 'categories', //Nombre tabla
                foreignKey: 'category_id' //Clave foránea
            })
    };

    return Subcategorie; //Exportamos modelo de tabla
}
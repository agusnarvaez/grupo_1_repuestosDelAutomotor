module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategories'; //Asignamos Alias
    let cols = { //Asignamos columnas
        id: {
            type: dataTypes.INTEGER, //Indicamos tipo de dato
            primaryKey: true, //Indicamos si es clave primaria
            autoincrement: true, // Indicamos si es autoincremental, en el caso de id lo es
            allowNull: false //No permite valor nulo
        },
        subcategory_name: {
            type: dataTypes.STRING,
            allowNull: false //No permite valor nulo
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false //No permite valor nulo
        }
    };
    let config = { //Configuraciones adicionales de la tabla
        tableName: 'subcategories',
        timestamps: false
    }
    let Subcategory = sequelize.define(alias, cols, config); //Creación de la tabla con sus datos

    // ***Asociaciones que tenga esta tabla***
    Subcategory.associate = (models) => {
        Subcategory.belongsTo( //Indicamos el tipod e relación
            models.Category, // Llamamos al modelo
            {
                as: 'categories', //Nombre tabla
                foreignKey: 'category_id' //Clave foránea
            })
    };

    return Subcategory; //Exportamos modelo de tabla
}
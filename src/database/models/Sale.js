module.exports = (sequelize, dataTypes) => {
    let alias = 'Sale'; //Asignamos Alias
    let cols = { //Asignamos columnas
        id: {
            type: dataTypes.INTEGER, //Indicamos tipo de dato
            primaryKey: true, //Indicamos si es clave primaria
            autoincrement: true // Indicamos si es autoincremental, en el caso de id lo es
        },
        sales_date: {
            type: dataTypes.DATE
        },
        total_amount: {
            type: dataTypes.DECIMAL
        },
        user_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'sales',
        timestamps: false
    };
    let Sale = sequelize.define(alias, cols, config); //Creación de la tabla con sus datos

    //Asociaciones que tenga esta tabla
    Sale.associate = (models) => {
        Sale.belongsTo( //Indicamos el tipo de relación
            models.User, // Llamamos al modelo
            {
                as: 'users', //Nombre tabla
                foreignKey: 'user_id' //Clave foránea
            });

        Sale.belongsToMany( //Relación N:M
            models.Product, // Llamamos al modelo
            {
                as: 'products', //Nombre tabla
                through: 'sales_detail', //Tabla intermedia
                foreignKey: 'sales_id', //Clave foránea de esta tabla
                otherKey: 'product_id', //Otra clave foránea
                timestamps: false
            });
    };

    return Sale; //Exportamos modelo de tabla
}
module.exports = (sequelize, dataTypes) => {
    let alias = 'Sale_detail'; //Asignamos Alias
    let cols = { //Asignamos columnas
        id: {
            type: dataTypes.INTEGER, //Indicamos tipo de dato
            primaryKey: true, //Indicamos si es clave primaria
            autoincrement: true, // Indicamos si es autoincremental, en el caso de id lo es
            allowNull: false //No permite valor nulo
        },
        amount: {
            type: dataTypes.DECIMAL,
            allowNull: false //No permite valor nulo
        },
        sales_id: {
            type: dataTypes.INTEGER,
            allowNull: false //No permite valor nulo
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false //No permite valor nulo
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false //No permite valor nulo
        }
    };
    let config = {
        tableName: 'sales_detail',
        timestamps: false
    };
    let Sale_detail = sequelize.define(alias, cols, config); //Creación de la tabla con sus datos

    //Asociaciones que tenga esta tabla
    Sale_detail.associate = (models) => {
        Sale_detail.belongsTo( //Indicamos el tipo de relación
            models.Product, // Llamamos al modelo
            {
                as: 'products', //Nombre tabla
                foreignKey: 'product_id' //Clave foránea
            }
        );

        Sale_detail.belongsTo( //Indicamos el tipo de relación
            models.Sale, // Llamamos al modelo
            {
                as: 'sales', //Nombre tabla
                foreignKey: 'sales_id' //Clave foránea
            }
        );
    };

    return Sale_detail; //Exportamos modelo de tabla
}
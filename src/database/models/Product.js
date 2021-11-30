module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; //Asignamos Alias
    let cols = { //Asignamos columnas
        id: {
            type: dataTypes.BIGINT(11), //Indicamos tipo de dato
            primaryKey: true, //Indicamos si es clave primaria
            autoincrement: true, // Indicamos si es autoincremental, en el caso de id lo es
            //allowNull: false //No permite valor nulo
        },
        product_name: {
            type: dataTypes.STRING(50),
            allowNull: false //No permite valor nulo
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false //No permite valor nulo
        },
        subcategory_id: {
            type: dataTypes.BIGINT(11),
            allowNull: false //No permite valor nulo
        },
        price: {
            type: dataTypes.DECIMAL(10,0),
            allowNull: false //No permite valor nulo
        },
        product_image: {
            type: dataTypes.STRING(100),
            allowNull: false //No permite valor nulo
        }
    };
    let config = { //Configuraciones adicionales de la tabla
        tableName: 'products',
        timestamps: false
    }
    let Product = sequelize.define(alias, cols, config); //Creación de la tabla con sus datos

    //Asociaciones que tenga esta tabla
    /* Product.associate = (models) => {
        Product.belongsTo( //Indicamos el tipo de relación
            models.Subcategory, // Llamamos al modelo
            {
                as: 'subcategories', //Nombre tabla
                foreignKey: 'subcategory_id' //Clave foránea
            });

        Product.belongsToMany( //Relación N:M
            models.Sale, // Llamamos al modelo
            {
                as: 'sales', //Nombre tabla
                through: 'sales_detail', //Tabla intermedia
                foreignKey: 'product_id', //Clave foránea de esta tabla
                otherKey: 'sales_id', //Otra clave foránea
                timestamps: false
            });
    } */
    return Product; //Exportamos modelo de tabla
}
module.exports = (sequelize,dataTypes) => {
    let alias = 'Shipping_address'; //Asignamos Alias
    let cols = { //Asignamos columnas
        id: {
            type: dataTypes.INTEGER, //Indicamos tipo de dato 
            primaryKey: true, //Indicamos si es clave primaria
            autoincrement: true, // Indicamos si es autoincremental, en el caso de id lo es
            allowNull: false //No permite valor nulo
        },
        city: {
            type: dataTypes.STRING,
            allowNull: false //No permite valor nulo
        },
        province: {
            type: dataTypes.STRING,
            allowNull: false //No permite valor nulo
        },
        street: {
            type: dataTypes.STRING,
            allowNull: false //No permite valor nulo
        },
        number: {
            type: dataTypes.INTEGER,
            allowNull: false //No permite valor nulo
        },
        floor: {
            type: dataTypes.STRING
        },
        apartment: {
            type: dataTypes.STRING
        },  
        zip_code: {
            type: dataTypes.INTEGER,
            allowNull: false //No permite valor nulo
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false //No permite valor nulo
        }
    };
    let config = { //Configuraciones adicionales de la tabla
        tableName: 'shipping_addresses',
        timestamps: false
    }
    let Shipping_address = sequelize.define(alias, cols, config); //Creación de la tabla con sus datos

    //Asociaciones que tenga esta tabla
    Shipping_address.associate = (models)=>{
        Shipping_address.belongsTo( //Indicamos el tipo de relación
            models.User, // Llamamos al modelo
            {
                as: 'users', //Nombre tabla
                foreignKey: 'user_id' //Clave foránea
            })
    };

    return Shipping_address; //Exportamos modelo de tabla
}
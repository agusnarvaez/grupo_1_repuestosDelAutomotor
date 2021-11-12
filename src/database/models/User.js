module.exports = (sequelize,dataTypes) => {
    let alias = 'User'; //Asignamos Alias
    let cols = { //Asignamos columnas
        id: {
            type: dataTypes.INTEGER, //Indicamos tipo de dato
            primaryKey: true, //Indicamos si es clave primaria
            autoincrement: true // Indicamos si es autoincremental, en el caso de id lo es
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        nickname: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        user_image: {
            type: dataTypes.STRING
        },
        role_id: {
            type: dataTypes.STRING
        }
    };
    let config = { //Configuraciones adicionales de la tabla
        tableName: 'users',
        timestamps: false
    }
    let User = sequelize.define(alias,cols,config); //Creación de la tabla con sus datos


    //Asociaciones que tenga esta tabla
    User.associate = (models)=>{ 
        User.hasMany( //Indicamos el tipo de relación
            models.Role, // Llamamos al modelo
            {
                as: 'roles', //Nombre tabla
                foreignKey: 'role_id' //Clave foránea
            })
    };

    return User; //Exportamos modelo de tabla
}
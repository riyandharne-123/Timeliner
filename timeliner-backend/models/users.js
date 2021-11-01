module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define("users", {
        name: DataTypes.STRING,
        email: { 
            type: DataTypes.STRING ,
            allowNull: false,
            unique: true
        },
        password: DataTypes.STRING
    });
}
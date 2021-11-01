module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define("tasks", {
        name: DataTypes.STRING,
        description: {
            type: DataTypes.BLOB,
            get() {
                return this.getDataValue('description').toString('utf8');
            },
        },
        date: DataTypes.DATEONLY,
        time: DataTypes.TIME,
        starred: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        timestamps: false
    });
}
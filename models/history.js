const savedHistory = (sequelize, DataTypes) => sequelize.define('historyTable', {
    method_name: {
        type: DataTypes.STRING,
        allowNull: false
        // unique: true
    },
    url_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    workspace_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = savedHistory;
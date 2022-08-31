import { DataTypes } from 'sequelize'

const Posts = (sequelize) => {
    const Schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        author: {
            type: DataTypes.TEXT 
        },
        cover_author: {
            type: DataTypes.TEXT 
        },
        ISBN_code: {
            type: DataTypes.TEXT 
        },
        image: {
            type: DataTypes.STRING 
        }
    }

    return sequelize.define('posts', Schema)
}

export default Posts
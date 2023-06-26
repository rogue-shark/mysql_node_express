import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

export async function getAllNotes() {
    const [rows] = await pool.query("select * from notes")
    return rows
}

/* ❌ Unsecure -- SQL Injection [https://www.youtube.com/watch?v=cx6Xs3F_1Uc]
To prevent this, we should use prepared statements. This means putting a quesion mark where the potentially unsafe value should be and passing the value to the query function in an array.

export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ${id}
    `)
    return rows[0]
} */
  
export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ${id}
    `)
    return rows
}

export async function createNote(title, contents) {
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, contents])
    return result
}


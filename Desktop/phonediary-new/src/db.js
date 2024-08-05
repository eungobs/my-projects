// src/db.js
import initSqlJs from 'sql.js';

let db;

export const initDatabase = async () => {
  const SQL = await initSqlJs();
  db = new SQL.Database();
  db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, summary TEXT, dateTime TEXT, priority TEXT)");
};

export const fetchTasks = () => {
  if (db) {
    const res = db.exec("SELECT * FROM tasks");
    return res[0] ? res[0].values : [];
  }
  return [];
};

export const insertTask = (title, summary, dateTime, priority) => {
  if (db) {
    db.run("INSERT INTO tasks (title, summary, dateTime, priority) VALUES (?, ?, ?, ?)", [title, summary, dateTime, priority]);
  }
};

export const deleteTask = (id) => {
  if (db) {
    db.run("DELETE FROM tasks WHERE id = ?", [id]);
  }
};

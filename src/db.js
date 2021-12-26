const {HOST,USER,PASS,DB,PORT} = process.env

async function connect() {
    if (global.connection && global.connection !== 'disconnected') { return global.connection }
    const mysql = require("mysql2/promise")
    const connection = mysql.createConnection("mysql://"+USER+":"+PASS+"@"+HOST+":"+PORT+"/"+DB+"")
    console.log("Conectado ao banco de dados")
    global.connection = connection
    return connection
}

connect()


async function userAuth(user, password) {
    const conn = await connect()
    const sql = "SELECT id FROM user WHERE user = ? AND pass = ?"
    const where = [user, password]
    
    const [rows] = await conn.query(sql, where)
    const [resultado] = rows
    if (resultado !== undefined && resultado.id) {
        return 1
    } else {
        return 0
    }
}

async function selectDados() {
    const conn = await connect()
    const [rows] = await conn.query("SELECT * FROM base_dados")
    return await rows
}
async function selectTotalEstados() {
    const conn = await connect()
    const [rows] = await conn.query("SELECT uf, estado, COUNT(UF) as total FROM `base_dados` GROUP BY UF")
    return await rows
}
async function selectTipoEstados() {
    const conn = await connect()
    const [rows] = await conn.query("SELECT uf, estado, TIPO, COUNT(UF) as total FROM `base_dados` GROUP BY UF, TIPO")
    return await rows
}
async function selectProdutoEstados() {
    const conn = await connect()
    const [rows] = await conn.query("SELECT uf, estado, produto, COUNT(UF) as total FROM `base_dados` GROUP BY UF, PRODUTO")
    return await rows
}



module.exports = { selectDados,selectTotalEstados,selectTipoEstados,selectProdutoEstados, userAuth }
module.exports = {

    getTotalQuiaNum: async (con) => {
        var totalNum = 0;
        await con.query("SELECT * FROM `questions`", (err, result, fields) => {
            if (err) throw err;
            console.log(result.length)
            totalNum = result.length
        });
        console.log(totalNum)
        return totalNum;
    },
    updatePassword: async (data, callBack) => {
        //console.log(data.userId);
        //console.log(data.password);
        const connection = await mysql.connection();
        let results = '';
        try {
            results = await connection.query(
                `UPDATE user SET password = ? WHERE user_id = ?`,
                [
                    data.password,
                    data.userId
                ]);
        } catch (err) {
            throw err;
        } finally {
            await connection.release();
            return callBack(null, results.affectedRows);
        }
    },
    deleteUser: async (userId, callBack) => {
        //console.log(data.userId);
        const connection = await mysql.connection();
        let results = user = '';
        try {
            //console.log("at deleteUser...");
            await connection.query("START TRANSACTION");
            results = await connection.query(
                `SELECT registry_id,comcol_id FROM user WHERE user_id = ?`,
                [userId]);
            if (results) {
                user = await connection.query(
                    `DELETE FROM user WHERE user_id = ?`,
                    [userId]);
                await connection.query(
                    `DELETE FROM s_registry WHERE registry_id = ?`,
                    [results.registry_id]);
                await connection.query(
                    `DELETE FROM s_com_columns WHERE comcol_id  = ?`,
                    [results.comcol_id]);
            }
            await connection.query("COMMIT");
        } catch (err) {
            await connection.query("ROLLBACK");
            //console.log('ROLLBACK at deleteUser', err);
            throw err;
        } finally {
            await connection.release();
            return callBack(null, user.affectedRows);
        }
    }
};
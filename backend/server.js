const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// CREATE Lead
app.post("/api/leads", (req, res) => {

    const { name, email, source, status, notes } = req.body;

    const sql = "INSERT INTO leads (name,email,source,status,notes) VALUES (?,?,?,?,?)";

    db.query(sql, [name, email, source, status, notes], (err, result) => {

        if (err) {
            res.send(err);
        } else {
            res.send("Lead Added");
        }

    });

});


// READ Leads
app.get("/api/leads", (req, res) => {

    db.query("SELECT * FROM leads ORDER BY id DESC", (err, result) => {

        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }

    });

});


// UPDATE Lead
app.put("/api/leads/:id", (req, res) => {

    const id = req.params.id;
    const { status, notes } = req.body;

    db.query(
        "UPDATE leads SET status=?, notes=? WHERE id=?",
        [status, notes, id],
        (err, result) => {

            if (err) {
                res.send(err);
            } else {
                res.send("Lead Updated");
            }

        }
    );

});


// DELETE Lead
app.delete("/api/leads/:id", (req, res) => {

    const id = req.params.id;

    db.query("DELETE FROM leads WHERE id=?", [id], (err, result) => {

        if (err) {
            res.send(err);
        } else {
            res.send("Lead Deleted");
        }

    });

});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
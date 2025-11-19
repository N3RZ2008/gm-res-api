import e from "express"
import cors from "cors"
import { connect } from "./connect.js"
import { ObjectId } from "mongodb"

const app = e()
app.use(e.json())
app.use(cors())
const PORT = process.env.PORT || 3000

app.get("/health", (req, res) => res.json({ ok: true }))

// Users
// Select all
app.get("/users", async (req, res) => {
    const db = await connect()
    const docs = await db.collection("users").find().toArray()
    res.json(docs)
})

// Select one
app.get("/users/:userId", async (req, res) => {
    const db = await connect()
    const adm = await db.collection("users")
        .findOne({ userId: req.params.userId })
    if (!adm) return res.status(404).json({ error: "not found" })
    res.json(adm)
})

// Insert
app.post("/users", async (req, res) => {
    try {
        const db = await connect()
        const body = req.body
        const result = await db.collection("users").insertOne(body)
        res.status(201).json({ insertedId: result.insertedId })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

// Edit
app.put("/users/:id", async (req, res) => {
    try {
        const db = await connect()
        const result = await db.collection("users").updateOne(
            { userId: req.params.id },
            { $set: req.body }
        )
        res.json({ modifiedCount: result.modifiedCount })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

// Delete
app.delete("/users/:id", async (req, res) => {
    try {
        const db = await connect()
        const result = await db.collection("users").deleteOne(
            { userId: req.params.id }
        )
        res.json({ deletedCount: result.deletedCount })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

// Orders
// Select all
app.get("/orders", async (req, res) => {
    const db = await connect()
    const docs = await db.collection("orders").find().toArray()
    res.json(docs)
})

// Select one
app.get("/orders/:number", async (req, res) => {
    const db = await connect()
    const adm = await db.collection("orders")
        .findOne({ number: req.params.number })
    if (!adm) return res.status(404).json({ error: "not found" })
    res.json(adm)
})

// Insert
app.post("/orders", async (req, res) => {
    try {
        const db = await connect()
        const body = req.body
        const result = await db.collection("orders").insertOne(body)
        res.status(201).json({ insertedId: result.insertedId })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

// Edit
app.put("/orders/:number", async (req, res) => {
    try {
        const db = await connect()
        const result = await db.collection("orders").updateOne(
            { number: req.params.number },
            { $set: req.body }
        )
        res.json({ modifiedCount: result.modifiedCount })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

// Delete
app.delete("/orders/:number", async (req, res) => {
    try {
        const db = await connect()
        const result = await db.collection("orders").deleteOne(
            { number: req.params.number }
        )
        res.json({ deletedCount: result.deletedCount })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

app.listen(PORT, () => { console.log(`Listening on ${PORT}`) })

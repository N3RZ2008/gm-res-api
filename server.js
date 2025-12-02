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
app.get("/orders/:id", async (req, res) => {
    const db = await connect()
    const adm = await db.collection("orders")
        .findOne({ number: Number(req.params.id) })
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
app.put("/orders/:id", async (req, res) => {
    try {
        const db = await connect()
        const result = await db.collection("orders").updateOne(
            { number: Number(req.params.id) },
            { $set: req.body }
        )
        res.json({ modifiedCount: result.modifiedCount })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

// Delete
app.delete("/orders/:id", async (req, res) => {
    try {
        const db = await connect()
        const result = await db.collection("orders").deleteOne(
            { number: Number(req.params.id) }
        )
        res.json({ deletedCount: result.deletedCount })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

// OrderConfig
// Select all
app.get("/orderConfig", async (req, res) => {
    const db = await connect()
    const docs = await db.collection("orderConfig").find().toArray()
    res.json(docs)
})

// Select one
app.get("/orderConfig/:id", async (req, res) => {
    const db = await connect()
    const adm = await db.collection("orderConfig")
        .findOne({ number: Number(req.params.id) })
    if (!adm) return res.status(404).json({ error: "not found" })
    res.json(adm)
})

// Insert
app.post("/orderConfig", async (req, res) => {
    try {
        const db = await connect()
        const body = req.body
        const result = await db.collection("orderConfig").insertOne(body)
        res.status(201).json({ insertedId: result.insertedId })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

// Edit
app.put("/orderConfig/:id", async (req, res) => {
    try {
        const db = await connect()
        const result = await db.collection("orderConfig").updateOne(
            { number: Number(req.params.id) },
            { $set: req.body }
        )
        res.json({ modifiedCount: result.modifiedCount })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

// Delete
app.delete("/orderConfig/:id", async (req, res) => {
    try {
        const db = await connect()
        const result = await db.collection("orderConfig").deleteOne(
            { number: Number(req.params.id) }
        )
        res.json({ deletedCount: result.deletedCount })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "internal" })
    }
})

app.listen(PORT, () => { console.log(`Listening on ${PORT}`) })

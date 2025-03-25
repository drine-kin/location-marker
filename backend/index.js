const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.get("/locations", async (req, res) => {
    try {
        const { page, limit } = req.query;
        const paginationOptions = {};
        if (page && limit) {
            paginationOptions.skip = (parseInt(page) - 1) * parseInt(limit);
            paginationOptions.take = parseInt(limit);
        }

        const locations = await prisma.location.findMany({
            ...paginationOptions,
            orderBy: { createdAt: "desc" },
        });

        const totalCount = await prisma.location.count();

        res.json({
            list: locations,
            totalCount: totalCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch locations" });
    }
});

app.post("/locations", async (req, res) => {
    try {
        const { name, description, image, latitude, longitude } = req.body;

        const location = await prisma.location.create({
            data: {
                name,
                description,
                image,
                latitude,
                longitude,
            },
        });

        res.status(201).json(location);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create locations" });
    }
});

app.get("/locations/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const location = await prisma.location.findUnique({
            where: { id: parseInt(id) },
        });

        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }

        res.json(location);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch location marker" });
    }
});

app.put("/locations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, latitude, longitude } = req.body;

        const updatedLocation = await prisma.location.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                image,
                latitude,
                longitude,
            },
        });

        res.json(updatedLocation);
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({ error: "Location not found" });
        }

        res.status(500).json({ error: "Failed to update location" });
    }
});

app.delete("/locations/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.location.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).end();
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({ error: "Location not found" });
        }

        res.status(500).json({ error: "Failed to delete location" });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

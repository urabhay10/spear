const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const Content = require('../models/Content');
const mongoose = require('mongoose');

router.post('/create-novel', jwtMiddleware, async (req, res) => {
    //10 letter unique id 
    const generatedId = Math.random().toString(36).substring(2, 15);
    try {
        const newContent = new Content({
            title: req.body.title,
            type: "Novel",
            description: req.body.description,
            chapters: req.body.chapters,
            uniqueId: generatedId,
            content: req.body.content
        });
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (error) {
        res.status(500).json({ error: 'Content creation failed' });
    }
});

router.post('/update-novel', jwtMiddleware, async (req, res) => {
    try {
        const givenChapters = req.body.chapters;
        const updatedChapters = givenChapters.map(chapter => {
            if (!chapter._id) {
                chapter._id = new mongoose.Types.ObjectId();
            }
            return chapter;
        });
        const filteredChapters = updatedChapters.filter(chapter => chapter.title !== "");
        const updatedContent = await Content.updateOne(
            { uniqueId: req.body.uniqueId },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    chapters: filteredChapters,
                    content: req.body.content,
                }
            }
        );
        res.status(201).json(updatedContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

router.get('/get-content', jwtMiddleware, async (req, res) => {
    try {
        const content = await Content.findOne({ uniqueId: req.query.uniqueId });
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ error: 'Content retrieval failed' });
    }
});

router.post('/create-story', jwtMiddleware, async (req, res) => {
    //10 letter unique id 
    const generatedId = Math.random().toString(36).substring(2, 15);
    try {
        const newContent = new Content({
            title: req.body.title,
            type: "Story",
            description: req.body.description,
            chapters: req.body.chapters,
            uniqueId: generatedId,
            content: req.body.content
        });
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (error) {
        res.status(500).json({ error: 'Content creation failed' });
    }
});

router.post('/create-note', jwtMiddleware, async (req, res) => {
    //10 letter unique id 
    const generatedId = Math.random().toString(36).substring(2, 15);
    try {
        const newContent = new Content({
            title: req.body.title,
            type: "Note",
            description: req.body.description,
            chapters: req.body.chapters,
            uniqueId: generatedId,
            content: req.body.content
        });
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (error) {
        res.status(500).json({ error: 'Content creation failed' });
    }
});

module.exports = router;
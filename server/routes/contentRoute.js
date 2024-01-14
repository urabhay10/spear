const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const User = require('../models/User');
const Content = require('../models/Content');
const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');

router.post('/create-novel', jwtMiddleware, async (req, res) => {
    const generatedId = uuidv4();
    try {
        const newContent = new Content({
            title: "Title",
            type: "Novel",
            chapters: [],
            uniqueId: generatedId,
            content: req.body.content || ""
        });
        const savedContent = await newContent.save();
        console.log(savedContent)
        const user = req.user
        user.contents.push({ uniqueId: generatedId });
        await user.save();
        res.status(201).json(savedContent);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Content creation failed' });
    }
});

router.post('/update-novel', jwtMiddleware, async (req, res) => {
    try {
        const givenChapters = req.body.chapters;
        const updatedChapters = givenChapters?.map(chapter => {
            if (!chapter._id) {
                chapter._id = new mongoose.Types.ObjectId();
            }
            return chapter;
        });
        const filteredChapters = updatedChapters?.filter(chapter => chapter.title !== "");
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
        const user = await User.findById(req.user._id);
        const uniqueIdToMove = req.body.uniqueId;
        if (user.contents.length > 0) {
            const existingIndex = user.contents.findIndex(content => content.uniqueId === uniqueIdToMove);
            if (existingIndex !== 0 && existingIndex !== -1) {
                user.contents.splice(existingIndex, 1);
                user.contents.unshift({ uniqueId: uniqueIdToMove });
                await user.save();
            }
        }
        res.status(201).json(updatedContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

router.get('/get-content', jwtMiddleware, async (req, res) => {
    try {
        const content = await Content.findOne({ uniqueId: req.query.uniqueId });
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ error: 'Content retrieval failed' });
    }
});

router.post('/get-all-content', jwtMiddleware, async (req, res) => {
    try {
        const contentArray = new Array();
        for (const uniqueId of req.body.uniqueIds) {
            const content = await Content.findOne({ uniqueId: uniqueId.uniqueId });
            if (!content) {
                return res.status(404).json({ message: 'Content not found' });
            }
            contentArray.push(content);
        }
        res.status(200).json(contentArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Content retrieval failed' });
    }
});

router.post('/delete-content', jwtMiddleware, async (req, res) => {
    try{
        const uniqueId = req.body.uniqueId;
        if(!uniqueId){
            return res.status(404).json({ message: 'Content not found' });
        }
        const deletedContent = await Content.deleteOne({uniqueId: uniqueId});
        const user = await User.findById(req.user._id);
        const existingIndex = user.contents.findIndex(content => content.uniqueId === uniqueId);
        if(existingIndex !== -1){
            user.contents.splice(existingIndex, 1);
            await user.save();
        }
        res.status(200).json(deletedContent);
    }catch(e){
        console.error(e);
        res.status(500).json({ error: 'Content deletion failed' });
    }
})

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
"use strict";
import { Request, Response } from "express";
import { Match } from "../models/match-model";
import mongoose from "mongoose";

// Function to get all matches
export const getAllMatches = async (req: Request, res: Response) => {
    try {
        const matches = await Match.find({});
        if (matches.length === 0) {
            return res.status(404).send('No matches found.');
        }
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).send('Internal error attempting to fetch matches.');
    }
};

// Function to get match by id
export const getMatchById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such match, invalid ID.' });
    }
    try {
        const match = await Match.findById(id);
        if (!match) {
            return res.status(404).json({ error: 'No such match.' });
        }
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: 'Internal error attempting to fetch match by ID.' });
    }
};

// Function to create a new match
export const createMatch = async (req: Request, res: Response) => {
    const match = req.body;
    try {
        const newMatchEntry = new Match(match);
        const savedMatch = await newMatchEntry.save();
        return res.status(201).json(savedMatch);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal error while attempting to create match.' });
    }
};


// Function to patch (update) match (accept/reject)
export const patchMatch = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const status = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such match, invalid ID.' });
    }
    try {
        const updatedMatch = await Match.findByIdAndUpdate(id, status , { new: true });
        if (!updatedMatch) {
            return res.status(404).json({ error: 'No match found by that ID to update.' });
        }
        res.status(200).json(updatedMatch);
    } catch (error) {
        res.status(500).json({ error: 'Internal error attempting to update match.' });
    }
};

// Function to delete match by id
export const deleteMatch = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such match, invalid ID.' });
    }
    try {
        const deletedMatch = await Match.findByIdAndDelete(id);
        if (!deletedMatch) {
            return res.status(404).json({ error: 'No match found by that ID to delete.' });
        }
        res.status(200).json(deletedMatch);
    } catch (error) {
        res.status(500).json({ error: 'Internal error attempting to delete match by ID.' });
    }
};

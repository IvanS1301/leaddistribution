const Lead = require('../models/leadModel')
const mongoose = require('mongoose')

// get all leads
const getLeads = async (req, res) => {
    const userLG_id = req.userLG._id

    const leads = await Lead.find({ userLG_id }).sort({createdAt: -1})

    res.status(200).json(leads)
}

// get all leads for TL
const getTLLeads = async (req, res) => {

    const leads = await Lead.find({ }).sort({createdAt: -1})

    res.status(200).json(leads)
}

// Fetch unassigned leads
const getUnassignedLeads = async (req, res) => {
    const userLG_id = req.userLG._id;

    // Check if there are any unassigned leads assigned to the current Telemarketer
    let unassignedLeads = await Lead.find({ assignedTo: userLG_id }).exec();

    // If there are no assigned leads or all assigned leads have been updated, fetch new unassigned leads and assign them to the Telemarketer
    if (unassignedLeads.length === 0 || unassignedLeads.every(lead => lead.callDisposition && lead.remarks)) {
        // Fetch new unassigned leads, limit to 10, and sort them
        unassignedLeads = await Lead.find({ assignedTo: { $exists: false } })
                                    .limit(10)
                                    .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
                                    .exec();
        
        // Assign fetched leads to the current Telemarketer
        unassignedLeads.forEach(async (lead) => {
            await Lead.findOneAndUpdate({ _id: lead._id }, { assignedTo: userLG_id });
        });
    }

    // Send the list of unassigned leads assigned to the Telemarketer as the response
    res.status(200).json(unassignedLeads);
}

// get a single lead
const getSingleLead = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No lead found'})
    }

    const lead = await Lead.findById(id)

    if (!lead) {
        return res.status(404).json({error: "No lead found"})
    }

    res.status(200).json(lead)
}

// create new lead
const createLead = async (req, res) => {
    const {name, type, phonenumber, streetaddress, city, postcode, emailaddress, callDisposition, remarks, assignedTo} = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!type) {
        emptyFields.push('type')
    }
    if (!phonenumber) {
        emptyFields.push('phonenumber')
    }
    if (!streetaddress) {
        emptyFields.push('streetaddress')
    }
    if (!city) {
        emptyFields.push('city')
    }
    if (!postcode) {
        emptyFields.push('postcode')
    }
    if (!emailaddress) {
        emptyFields.push('emailaddress')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try {
      const userLG_id = req.userLG._id
      const lead = await Lead.create({name, type, phonenumber, streetaddress, city, postcode, emailaddress, callDisposition, remarks, userLG_id, assignedTo})
      res.status(200).json(lead)
    } catch (error) {
      res.status(400).json({error: error.message}) 
    }
}

// delete lead
const deleteLead = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No lead found'})
    }

    const lead = await Lead.findOneAndDelete({_id: id})

    if(!lead) {
        return res.status(400).json({error: 'No lead found'})
    }

    res.status(200).json(lead)

}

// update lead
const updateLead = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No lead found'})
    }

    const lead = await Lead.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!lead) {
        return res.status(400).json({error: 'No lead found'})
    }

    res.status(200).json(lead)
}

module.exports = {
    getLeads,
    getSingleLead,
    createLead,
    deleteLead,
    updateLead,
    getTLLeads,
    getUnassignedLeads
}

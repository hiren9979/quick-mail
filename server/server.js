const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const templatesPath = path.join(__dirname, 'templates.json');

// Helper function to read templates from the file
const getTemplates = () => {
    const data = fs.readFileSync(templatesPath, 'utf8');
    return JSON.parse(data).templates;
};

// Helper function to save templates to the file
const saveTemplates = (templates) => {
    fs.writeFileSync(templatesPath, JSON.stringify({ templates }, null, 2), 'utf8');
};

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hirenchavda141@gmail.com',
        pass: 'owqc rzdj dycq quor'
    }
});

// API to send an email
app.post('/api/send-email', async (req, res) => {
    try {
        const { to, templateId } = req.body;

        const templates = getTemplates();
        const selectedTemplate = templates.find(t => t.id === templateId);

        if (!selectedTemplate) {
            return res.status(404).json({ error: 'Template not found' });
        }

        const mailOptions = {
            from: 'hirenchavda141@gmail.com',
            to,
            subject: selectedTemplate.subject,
            text: selectedTemplate.body
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// API to get all templates
app.get('/api/templates', (req, res) => {
    try {
        const templates = getTemplates();
        res.json(templates);
    } catch (error) {
        console.error('Error reading templates:', error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

// Create a new template
app.post('/api/templates', (req, res) => {
    try {
        const { name, subject, body } = req.body;
        if (!name || !subject || !body) {
            return res.status(400).json({ error: 'Name, subject, and body are required.' });
        }

        const templates = getTemplates();
        const newTemplate = { id: uuidv4(), name, subject, body };
        templates.push(newTemplate);
        saveTemplates(templates);

        res.status(201).json(newTemplate);
    } catch (error) {
        console.error('Error creating template:', error);
        res.status(500).json({ error: 'Failed to create template.' });
    }
});

// Update a template by ID
app.put('/api/templates', (req, res) => {
    try {
        const { id, name, subject, body } = req.body;

        if (!id || !name || !subject || !body) {
            return res.status(400).json({ error: 'ID, name, subject, and body are required.' });
        }

        const templates = getTemplates();
        const templateIndex = templates.findIndex(t => t.id === id);

        if (templateIndex === -1) {
            return res.status(404).json({ error: 'Template not found.' });
        }

        templates[templateIndex] = { id, name, subject, body };
        saveTemplates(templates);

        res.json(templates[templateIndex]);
    } catch (error) {
        console.error('Error updating template:', error);
        res.status(500).json({ error: 'Failed to update template.' });
    }
});

// Delete a template by ID
app.delete('/api/templates', (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID is required.' });
        }

        const templates = getTemplates();
        const templateIndex = templates.findIndex(t => t.id === id);

        if (templateIndex === -1) {
            return res.status(404).json({ error: 'Template not found.' });
        }

        templates.splice(templateIndex, 1);
        saveTemplates(templates);

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting template:', error);
        res.status(500).json({ error: 'Failed to delete template.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

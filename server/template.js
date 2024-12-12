
// Create a new template
app.post('/templates', (req, res) => {
    const { name, subject, body } = req.body;
    if (!name || !subject || !body) {
        return res.status(400).json({ error: 'Name, subject, and body are required.' });
    }

    const newTemplate = { id: uuidv4(), name, subject, body };
    templates.push(newTemplate);
    res.status(201).json(newTemplate);
});

// Get all templates
app.get('/templates', (req, res) => {
    res.json(templates);
});

// Get a single template by ID
app.get('/templates/:id', (req, res) => {
    const { id } = req.params;
    const template = templates.find(t => t.id === id);

    if (!template) {
        return res.status(404).json({ error: 'Template not found.' });
    }

    res.json(template);
});

// Update a template by ID
app.put('/templates', (req, res) => {
    const { id, name, subject, body } = req.body;

    if (!id || !name || !subject || !body) {
        return res.status(400).json({ error: 'ID, name, subject, and body are required.' });
    }

    const templateIndex = templates.findIndex(t => t.id === id);
    if (templateIndex === -1) {
        return res.status(404).json({ error: 'Template not found.' });
    }

    templates[templateIndex] = { id, name, subject, body };
    res.json(templates[templateIndex]);
});

// Delete a template by ID
app.delete('/templates', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is required.' });
    }

    const templateIndex = templates.findIndex(t => t.id === id);
    if (templateIndex === -1) {
        return res.status(404).json({ error: 'Template not found.' });
    }

    templates.splice(templateIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

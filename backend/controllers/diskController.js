const scan = require('../algorithms/scan');
const cscan = require('../algorithms/cscan');
const sstf = require('../algorithms/sstf');

const extractData = (req) => {
    let { requests, head, size, direction } = req.body;
    
    // Parse inputs
    if (typeof requests === 'string') {
        requests = requests.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    }
    head = parseInt(head);
    size = parseInt(size);
    
    if (!direction) {
        direction = 'left';
    }
    
    return { requests, head, size, direction };
};

exports.calculateScan = (req, res) => {
    try {
        const { requests, head, size, direction } = extractData(req);
        
        if (!requests || isNaN(head) || isNaN(size)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        
        const result = scan(requests, head, size, direction);
        return res.json(result);
    } catch (error) {
        console.error("SCAN Error:", error);
        return res.status(500).json({ error: 'Server error calculating SCAN' });
    }
};

exports.calculateCscan = (req, res) => {
    try {
        const { requests, head, size, direction } = extractData(req);
        
        if (!requests || isNaN(head) || isNaN(size)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        
        const result = cscan(requests, head, size, direction);
        return res.json(result);
    } catch (error) {
        console.error("C-SCAN Error:", error);
        return res.status(500).json({ error: 'Server error calculating C-SCAN' });
    }
};

exports.calculateSstf = (req, res) => {
    try {
        const { requests, head, size, direction } = extractData(req);
        
        if (!requests || isNaN(head)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        
        const result = sstf(requests, head);
        return res.json(result);
    } catch (error) {
        console.error("SSTF Error:", error);
        return res.status(500).json({ error: 'Server error calculating SSTF' });
    }
};

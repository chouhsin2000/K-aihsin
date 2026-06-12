import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Database file path
const dbPath = path.join(__dirname, 'eco-data.json');

// Initialize database
function initDatabase() {
  if (!fs.existsSync(dbPath)) {
    const initialData = {
      documents: [],
      versions: [],
      specialties: ['Electronics', 'Mechanical', 'Software']
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  }
}

// Read database
function readDatabase() {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch (error) {
    return { documents: [], versions: [], specialties: ['Electronics', 'Mechanical', 'Software'] };
  }
}

// Write database
function writeDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// API Routes

// Get all documents
app.get('/api/documents', (req, res) => {
  const data = readDatabase();
  res.json(data.documents);
});

// Get documents by specialty
app.get('/api/documents/specialty/:specialty', (req, res) => {
  const data = readDatabase();
  const filtered = data.documents.filter(doc => doc.specialty === req.params.specialty);
  res.json(filtered);
});

// Upload file
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    const data = readDatabase();
    const newDocument = {
      id: Date.now().toString(),
      filename: req.file.originalname,
      filepath: req.file.path,
      filetype: path.extname(req.file.originalname),
      specialty: req.body.specialty,
      uploadDate: new Date().toISOString(),
      versions: [
        {
          versionId: 1,
          description: 'Initial upload',
          date: new Date().toISOString(),
          filePath: req.file.path
        }
      ]
    };
    data.documents.push(newDocument);
    writeDatabase(data);
    res.json({ success: true, document: newDocument });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update document
app.put('/api/documents/:id', upload.single('file'), (req, res) => {
  try {
    const data = readDatabase();
    const docIndex = data.documents.findIndex(doc => doc.id === req.params.id);
    if (docIndex === -1) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }

    const document = data.documents[docIndex];
    const newVersion = {
      versionId: (document.versions.length || 0) + 1,
      description: req.body.description || 'Version update',
      date: new Date().toISOString(),
      filePath: req.file ? req.file.path : document.versions[document.versions.length - 1].filePath
    };

    document.versions.push(newVersion);
    document.updateDate = new Date().toISOString();
    writeDatabase(data);
    res.json({ success: true, document });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get document versions
app.get('/api/documents/:id/versions', (req, res) => {
  const data = readDatabase();
  const document = data.documents.find(doc => doc.id === req.params.id);
  if (!document) {
    return res.status(404).json({ success: false, error: 'Document not found' });
  }
  res.json(document.versions || []);
});

// Delete document
app.delete('/api/documents/:id', (req, res) => {
  try {
    const data = readDatabase();
    const docIndex = data.documents.findIndex(doc => doc.id === req.params.id);
    if (docIndex === -1) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }
    data.documents.splice(docIndex, 1);
    writeDatabase(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Download file
app.get('/api/download/:id', (req, res) => {
  try {
    const data = readDatabase();
    const document = data.documents.find(doc => doc.id === req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }
    res.download(document.versions[document.versions.length - 1].filePath);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Initialize and start server
initDatabase();
app.listen(PORT, () => {
  console.log(`ECO Management System server running on port ${PORT}`);
});

---

```markdown
# Ì∫® IRIDM Disaster Management Assistant

![Made with Flask](https://img.shields.io/badge/Made%20with-Flask-blue)
![Frontend HTML/CSS/JS](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange)
![LangChain](https://img.shields.io/badge/AI-LangChain-brightgreen)
![Status](https://img.shields.io/badge/Status-Working%20Beta-success)
![License](https://img.shields.io/badge/License-MIT-informational)

> A powerful real-time Disaster Management Planning Assistant developed for **IRIDM Bangalore**, powered by **Groq LLM**, **LangChain**, **FAISS**, and an elegant responsive UI.

---

## Ìºê Live Preview

Ì∫ß **Coming Soon!** Hosted link will be added once deployed.

---

## Ì∑† Features

| Ìºü AI-Powered Chat | Ì∑∫Ô∏è Interactive Maps | Ìø• Damage Tracker | ‚ö° Emergency Controls |
|--------------------|---------------------|-------------------|-----------------------|
| Vector search + Groq LLM chatbot for IRIDM policies | Leaflet-based real-time map with fire stations, hospitals, and police | Local record-keeping for structural, IT, casualty, and recovery data | Emergency contacts, hazard zones, drills, awareness launches |

---

## Ì≥ΩÔ∏è Sneak Peek

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjB2OHhxZWh1MXdzemw2eGR5NGY2bTlmNjBmdjByYXo0aTcxaGE3dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MF0ZupagIFKbE4JHib/giphy.gif" width="600"/>
</p>

---

## Ì∑© Project Structure

```

Ì≥¶IRIDM\_DM\_Assistant
‚î£ Ì≥Åstatic/
‚îÉ ‚î£ Ì≥Åimages/
‚îÉ ‚î£ Ì≥Åicons/
‚î£ Ì≥Åtemplates/
‚îÉ ‚îó Ì≥Ñindex.html
‚î£ Ì≥Ñstyle.css
‚î£ Ì≥Ñapp\_chatbot.py         # Ì¥Å Flask + LangChain backend
‚î£ Ì≥Ñapp.js                 # Ì≤ª Frontend logic for damage logging, maps, modals
‚î£ Ì≥Ñfaiss\_index.faiss
‚î£ Ì≥Ñfaiss\_index.pkl
‚îó Ì≥ÑREADME.md

````

---

## Ì∫Ä Quick Start (Local Setup)

### Ì≥¶ Backend (Flask + LangChain + Groq)

```bash
# Create environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variable
echo "GROQ_API_KEY=your-key-here" > .env

# Run server
python app_chatbot.py
````

---

### Ì≤ª Frontend

Just open `index.html` in a browser. It uses:

* Bootstrap 5
* Leaflet JS
* Font Awesome

All images are loaded from `/static/images/`.

---

## Ì∑† AI Architecture

```mermaid
graph TD
A[User Query] --> B[Frontend JS]
B --> C[/api/query POST]
C --> D[Flask (app_chatbot.py)]
D --> E[LangChain Agent]
E --> F[FAISS + HuggingFace Embeddings]
E --> G[Groq LLM (fallback)]
F --> H[Best Match Answer + Sources]
G --> H
H --> I[Response to User]
```

---

## ÌæØ Core Technologies

| Tech        | Purpose                        |
| ----------- | ------------------------------ |
| Flask       | API backend                    |
| LangChain   | Chaining LLM + Retriever       |
| Groq        | High-speed LLM inferencing     |
| HuggingFace | Text embedding model           |
| FAISS       | Vector similarity search       |
| Leaflet.js  | Interactive geospatial mapping |
| Bootstrap   | Responsive UI                  |

---

## Ì¥ê .env Configuration

Make sure to include:

```env
GROQ_API_KEY=your_api_key_here
```

---

## Ìª°Ô∏è Use Cases

* Ì≥ç Real-time fire/hazard zone awareness
* Ìø´ DM training for campus institutions
* Ì∑ÇÔ∏è Structured recovery & casualty logging
* Ì¥ñ Instant policy answers via AI agent

---

## Ì≤° Future Improvements

* Ìª∞Ô∏è Real-time sensor integration
* Ì∑É Export data to Excel/PDF
* Ì≥ä Admin dashboard with analytics
* Ì∑≠ Indoor evacuation guidance

---

## Ì¥ù Contributing

Pull requests are welcome! Feel free to fork and make enhancements. For major changes, open an issue first.

---

## Ì≥ú License

MIT License. Use freely, cite appropriately Ìπè

---

## Ì±§ Developed by

**Shruti Verma**
Ì≤º Intern at IRIDM, AI & Data Science Enthusiast
Ì¥ó [LinkedIn](https://www.linkedin.com/in/shrutiverma/) | [GitHub](https://github.com/ShrutiVerma3008)

---

> *"Turning emergency planning into smart, interactive experiences."*

```

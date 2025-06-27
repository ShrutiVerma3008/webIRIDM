
---

```markdown
# � IRIDM Disaster Management Assistant

![Made with Flask](https://img.shields.io/badge/Made%20with-Flask-blue)
![Frontend HTML/CSS/JS](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange)
![LangChain](https://img.shields.io/badge/AI-LangChain-brightgreen)
![Status](https://img.shields.io/badge/Status-Working%20Beta-success)
![License](https://img.shields.io/badge/License-MIT-informational)

> A powerful real-time Disaster Management Planning Assistant developed for **IRIDM Bangalore**, powered by **Groq LLM**, **LangChain**, **FAISS**, and an elegant responsive UI.

---

## � Live Preview

� **Coming Soon!** Hosted link will be added once deployed.

---

## � Features

| � AI-Powered Chat | �️ Interactive Maps | � Damage Tracker | ⚡ Emergency Controls |
|--------------------|---------------------|-------------------|-----------------------|
| Vector search + Groq LLM chatbot for IRIDM policies | Leaflet-based real-time map with fire stations, hospitals, and police | Local record-keeping for structural, IT, casualty, and recovery data | Emergency contacts, hazard zones, drills, awareness launches |

---

## �️ Sneak Peek

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjB2OHhxZWh1MXdzemw2eGR5NGY2bTlmNjBmdjByYXo0aTcxaGE3dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MF0ZupagIFKbE4JHib/giphy.gif" width="600"/>
</p>

---

## � Project Structure

```

�IRIDM\_DM\_Assistant
┣ �static/
┃ ┣ �images/
┃ ┣ �icons/
┣ �templates/
┃ ┗ �index.html
┣ �style.css
┣ �app\_chatbot.py         # � Flask + LangChain backend
┣ �app.js                 # � Frontend logic for damage logging, maps, modals
┣ �faiss\_index.faiss
┣ �faiss\_index.pkl
┗ �README.md

````

---

## � Quick Start (Local Setup)

### � Backend (Flask + LangChain + Groq)

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

### � Frontend

Just open `index.html` in a browser. It uses:

* Bootstrap 5
* Leaflet JS
* Font Awesome

All images are loaded from `/static/images/`.

---

## � AI Architecture

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

## � Core Technologies

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

## � .env Configuration

Make sure to include:

```env
GROQ_API_KEY=your_api_key_here
```

---

## �️ Use Cases

* � Real-time fire/hazard zone awareness
* � DM training for campus institutions
* �️ Structured recovery & casualty logging
* � Instant policy answers via AI agent

---

## � Future Improvements

* �️ Real-time sensor integration
* � Export data to Excel/PDF
* � Admin dashboard with analytics
* � Indoor evacuation guidance

---

## � Contributing

Pull requests are welcome! Feel free to fork and make enhancements. For major changes, open an issue first.

---

## � License

MIT License. Use freely, cite appropriately �

---

## � Developed by

**Shruti Verma**
� Intern at IRIDM, AI & Data Science Enthusiast
� [LinkedIn](https://www.linkedin.com/in/shrutiverma/) | [GitHub](https://github.com/ShrutiVerma3008)

---

> *"Turning emergency planning into smart, interactive experiences."*

```

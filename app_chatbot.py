from flask import Flask, request, jsonify
from langchain_groq import ChatGroq
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool
from dotenv import load_dotenv
import os

# Load API key
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# Embedding model
embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Load vectorstore
vectorstore = FAISS.load_local(
    folder_path="D:\SEM_4 project\Iridim_project\sahara_sahaya\web2\vectorstore",
    embeddings=embedding,
    index_name="faiss_index",
    allow_dangerous_deserialization=True
)

# LLM setup
llm = ChatGroq(
    model_name="meta-llama/llama-4-maverick-17b-128e-instruct",
    temperature=0
)

# Retrieval setup
retriever = vectorstore.as_retriever(search_type="similarity", k=3)
qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, return_source_documents=True)

# Tool logic
def iridm_with_fallback_tool_func(query: str) -> str:
    result = qa_chain(query)
    answer = result.get("result", "")
    sources = result.get("source_documents", [])

    if not sources or len(answer.strip()) < 10:
        fallback = llm.invoke(f"Answer this using general knowledge: {query}")
        return f"Fallback Answer: {fallback}"

    return f"Answer: {answer}\n\nSources:\n" + "\n".join(
        f"- {doc.page_content[:200].strip()}..." for doc in sources
    )

# Create agent
smart_tool = Tool(
    name="IRIDM_QA_Tool",
    func=iridm_with_fallback_tool_func,
    description="Answers IRIDM-related questions using a vector retriever. Falls back to Groq LLM if no relevant data is found."
)

agent_executor = initialize_agent(
    tools=[smart_tool],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# Flask setup
app = Flask(_name_)

@app.route('/api/query', methods=['POST'])
def query_chatbot():
    data = request.json
    user_input = data.get("query", "")

    response = agent_executor.run(user_input)

    return jsonify({"response": response})

if _name_ == '_main_':
    app.run(debug=True)
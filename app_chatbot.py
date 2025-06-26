# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from langchain_groq import ChatGroq
# from langchain.vectorstores import FAISS
# from langchain.embeddings import HuggingFaceEmbeddings
# from langchain.chains import RetrievalQA
# from langchain.agents import initialize_agent, AgentType
# from langchain.tools import Tool
# from dotenv import load_dotenv
# import os

# # Load environment variables
# load_dotenv()
# groq_api_key = os.getenv("GROQ_API_KEY")

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)  # Enable CORS for all domains and routes

# # Step 1: Embedding Model
# embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

# # Step 2: Load Vectorstore
# vectorstore_path = "/SEM_4 project/Iridim_project/sahara_sahaya/web2/vectorstore_txt"
# vectorstore = FAISS.load_local(
#     folder_path=vectorstore_path,
#     embeddings=embedding,
#     index_name="faiss_index",
#     allow_dangerous_deserialization=True
# )

# # Step 3: Initialize LLM (Groq)
# llm = ChatGroq(
#     model_name="qwen-qwq-32b",
#     temperature=0
# )

# # Step 4: Retrieval Setup (MMR for diversity)
# retriever = vectorstore.as_retriever(
#     search_type="mmr",
#     search_kwargs={"k": 20, "fetch_k": 40}
# )

# qa_chain = RetrievalQA.from_chain_type(
#     llm=llm,
#     retriever=retriever,
#     return_source_documents=True,
#     chain_type="stuff"
# )

# # Step 5: Define the Tool Function
# def iridm_with_fallback_tool_func(query: str) -> str:
#     result = qa_chain(query)
#     answer = result.get("result", "")
#     sources = result.get("source_documents", [])

#     print(f"\n🧠 Answer: {answer}")
#     print(f"📚 Source count: {len(sources)}")

#     for i, doc in enumerate(sources):
#         print(f"\n📄 Source [{i+1}]:\n{doc.page_content[:600]}\n{'-'*60}")

#     if sources:
#         source_texts = "\n".join(
#             f"- {doc.page_content[:800].strip()}..." for doc in sources
#         )
#         return f"✅ Answer: {answer}\n\n🔍 Sources:\n{source_texts}"
    
#     # Fallback if no documents found
#     fallback = llm.invoke(f"Answer this using general knowledge: {query}")
#     return f"⚠ Fallback Answer (LLM only): {fallback}"

# # Step 6: Tool Setup for the Agent
# smart_tool = Tool(
#     name="IRIDM_QA_Tool",
#     func=iridm_with_fallback_tool_func,
#     description="Answers IRIDM-related questions using a vector retriever. Falls back to Groq LLM if no relevant data is found."
# )

# # Step 7: Agent Initialization
# agent_executor = initialize_agent(
#     tools=[smart_tool],
#     llm=llm,
#     agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
#     verbose=True,
#     handle_parsing_errors=True
# )

# # Step 8: API Endpoint for Chatbot Query
# @app.route('/api/query', methods=['POST'])
# def query_chatbot():
#     try:
#         data = request.get_json()
#         if not data or "query" not in data:
#             return jsonify({"error": "Missing 'query' key in request"}), 400

#         user_input = data["query"]
#         response = agent_executor.run(user_input)
#         return jsonify({"response": response})

#     except Exception as e:
#         print(f"❌ Error: {str(e)}")
#         return jsonify({"error": "Internal server error", "details": str(e)}), 500

# # Step 9: Run Flask Server
# if __name__ == '_main_':
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# LangChain modules
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool

# Load .env variables
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# === Flask App Initialization ===
app = Flask(__name__)
CORS(app)  # Enable CORS globally

# === Step 1: Embedding Model ===
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

# === Step 2: Load VectorStore ===
vectorstore = FAISS.load_local(
    folder_path="D:/SEM_4 project/Iridim_project/sahara_sahaya/web2/vectorstore_txt",
    embeddings=embedding,
    index_name="faiss_index",
    allow_dangerous_deserialization=True
)

# === Step 3: Load Groq LLM ===
llm = ChatGroq(
    model_name="qwen-qwq-32b",
    temperature=0
)

# === Step 4: Create Retriever with MMR ===
retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 20, "fetch_k": 40}
)

# === Step 5: Retrieval QA Chain ===
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
    chain_type="stuff"
)

# === Step 6: Custom Tool Logic ===
def iridm_with_fallback_tool_func(query: str) -> str:
    result = qa_chain(query)
    answer = result.get("result", "")
    sources = result.get("source_documents", [])

    print(f"\n🧠 Answer: {answer}")
    print(f"📚 Retrieved {len(sources)} source(s)")

    for i, doc in enumerate(sources):
        print(f"\n📄 Source [{i+1}]:\n{doc.page_content[:600]}\n{'-'*60}")

    if sources:
        sources_combined = "\n".join(
            f"- {doc.page_content[:800].strip()}..." for doc in sources
        )
        return f"✅ Answer: {answer}\n\n🔍 Sources:\n{sources_combined}"
    
    # Fallback LLM response if no documents found
    fallback = llm.invoke(f"Answer this using general knowledge: {query}")
    return f"⚠ Fallback Answer (LLM only): {fallback}"

# === Step 7: Define Tool for Agent ===
smart_tool = Tool(
    name="IRIDM_QA_Tool",
    func=iridm_with_fallback_tool_func,
    description="Answers IRIDM-related questions using a vector retriever. Falls back to Groq LLM if no relevant data is found."
)

# === Step 8: Create LangChain Agent ===
agent_executor = initialize_agent(
    tools=[smart_tool],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    handle_parsing_errors=True
)

# === Step 9: Define Chatbot API Endpoint ===
@app.route('/api/query', methods=['POST'])
def query_chatbot():
    try:
        data = request.get_json()
        if not data or "query" not in data:
            return jsonify({"error": "Missing 'query' key in request"}), 400

        user_input = data["query"]
        response = agent_executor.run(user_input)
        return jsonify({"response": response})

    except Exception as e:
        print(f"🚨 Internal Error: {e}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

# === Step 10: Run Server ===
if __name__ == '__main__':
    app.run(debug=True)
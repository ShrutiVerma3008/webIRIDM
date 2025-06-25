
from langchain_groq import ChatGroq
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os

load_dotenv()

embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

vectorstore = FAISS.load_local(
    folder_path="vectorstore",
    embeddings=embedding,
    index_name="faiss_index",
    allow_dangerous_deserialization=True
)

llm = ChatGroq(
    model_name="meta-llama/llama-4-maverick-17b-128e-instruct",
    temperature=0
)

retriever = vectorstore.as_retriever(search_type="similarity", k=3)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True
)

def get_bot_response(query: str) -> str:
    result = qa_chain(query)
    return result.get('result', "I'm not sure how to answer that.")

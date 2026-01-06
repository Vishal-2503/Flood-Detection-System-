import os
from groq import Groq # pyright: ignore[reportMissingImports]
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def llm_response(question, flood_risk, lat, lng):
    prompt = f"""
You are a flood risk assistant.

Location:
Latitude: {lat}
Longitude: {lng}

Flood Risk Level: {flood_risk}

User Question:
{question}

Explain clearly and give safety advice if needed.
"""

    chat_completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a helpful flood risk assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    return chat_completion.choices[0].message.content

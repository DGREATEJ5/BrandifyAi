from openai import OpenAI
from dotenv import load_dotenv
import os
import argparse
import re
from typing import List


MAX_INPUT_LENGTH = 32

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input received: {user_input}")   
    if validate_lenght(user_input):
        branding_result = generate_branding_snippet(user_input)
        keywords_result = generate_keywords(user_input)
    else:
        raise ValueError(f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.") 


def validate_lenght(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


def generate_branding_snippet(prompt: str) -> str:
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    enriched_prompt = f"Generate an upbeat, catchy branding snippet for {prompt}. Keep it under 30 words."
    print(enriched_prompt)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a professional marketing copywriter who creates catchy branding text."},
            {"role": "user", "content": enriched_prompt}
        ],
        temperature=0.85,
        max_tokens=32
    )

    branding_text = response.choices[0].message.content.strip()
    print(f"Snippet: {branding_text}")
    return branding_text


def generate_keywords(prompt: str) -> List[str]:
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    enriched_prompt = f"Generate related branding keywords for {prompt}. Keep it under 8 words."
    print(enriched_prompt)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a professional marketing copywriter who creates catchy branding text."},
            {"role": "user", "content": enriched_prompt}
        ],
        temperature=0.85,
        max_tokens=32
    )

    # Get the raw text
    keywords_text = response.choices[0].message.content.strip()

    # Use regex to split into a clean list
    keywords = re.split(r'\d+\.\s*|,|\n|-\s*', keywords_text)
    keywords = [k.strip() for k in keywords if k.strip()]
    print(f"Keywords: {keywords}")

    return keywords



if __name__ == "__main__":
    main()

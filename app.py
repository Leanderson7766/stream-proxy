from flask import Flask, request, Response
import requests

app = Flask(__name__)

@app.route("/")
def proxy():
    url = request.args.get("url")
    if not url:
        return "URL ausente", 400

    headers = {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www-fontedecanais-io.79xddz54cefe70.com/"
    }

    r = requests.get(url, headers=headers, stream=True)
    return Response(r.iter_content(chunk_size=8192), content_type=r.headers.get("content-type"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

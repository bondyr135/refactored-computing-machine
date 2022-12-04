from flask import Flask, Response, jsonify
from flask import request
from pytube import YouTube
import json

app = Flask(__name__)

# Checks if the address sent is a valid YT address


@app.route("/try_yt", methods=["GET"])
def try_yt():
    print('Trying to probe...')

    try:
        link = request.args.get('videourl')

    except Exception as e:
        # return Response(
        #     "The URL you entered does not lead to a valid YouTube page"
        # )
        return Response(
            '{"err": "The URL you entered does not lead to a valid YouTube page"}'
        )

    else:
        yt = YouTube(link)
        return {
            "title": yt.title,
            "embed_url": yt.embed_url,
        }

######################################################
######################################################


@app.route("/download_yt", methods=["GET"])
def download_yt():
    print('HIT!!!')
    link = request.args.get('videourl')
    yt = YouTube(link)
    best = yt.streams.get_highest_resolution()

    download_path = "C:\\Users\Ravid\Desktop\RavidDT"
    print('Downloading ' + yt.title + '...')
    best.download()
    print('Downloaded finished')

    return {
        "status": "Download finished! Hoorah!"
    }


if __name__ == "__main__":
    app.run(debug=True)
    print('PROGRAM IS RUNNING!')

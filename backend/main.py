import requests

key = "60b25e511e665f74990a01ead6b752df5f084"

url = input()
api_url = f"https://cutt.ly/api/api.php?key={key}&short={url}"
data = requests.get(api_url).json()["url"]
if data["status"] == 7:
    shortened_url = data["shortLink"]
    print("Shortened URL:", shortened_url)
else:
    print("[!] Error Shortening URL:", data)
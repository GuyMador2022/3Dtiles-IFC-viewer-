import http.server, socketserver, webbrowser, sys, os
PORT = 8000
ROOT = os.path.dirname(__file__) or "."
os.chdir(ROOT)
print(f"Serving {ROOT} at http://localhost:{PORT}/index.html")
with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    try:
        webbrowser.open(f"http://localhost:{PORT}/index.html")
    except Exception:
        pass
    httpd.serve_forever()

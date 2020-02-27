import os
from flask import Flask, send_from_directory

from app import app
from app.api.algorithms import simplex
from app.api.algorithms import branch_and_bound
from app.api.algorithms import simplex

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")


@app.route('/')
@app.route('/index.html')
def index():
    return send_from_directory(root, 'index.html')

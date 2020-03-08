import json
from flask import jsonify
from app import app
from app.modules.simplex import simplex


@app.route('/api/algorithms/simplex')
def simplex_algorithm():
    program_matrix = [
        [8, 10, 7, "max"],
        [1, 3, 2, 10, "<="],
        [1, 5, 1, 8, "<="]
    ]

    z, x = simplex(program_matrix)

    return jsonify({
        "z": z,
        "x": x
    })

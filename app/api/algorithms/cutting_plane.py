from app import app


@app.route('/api/algorithms/cutting_plane')
def cutting_plane():
    return "cp"

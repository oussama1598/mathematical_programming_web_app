from app import app


@app.route('/api/algorithms/simplex')
def simplex():
    return 'simplex'

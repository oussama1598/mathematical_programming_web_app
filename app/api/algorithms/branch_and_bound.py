from app import app


@app.route('/api/algorithms/branch_and_bound')
def branch_and_bound():
    return "bb"

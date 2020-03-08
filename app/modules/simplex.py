import copy


def is_sup_or_inf(line):
    return 1 if line[-1] == "<=" else -1


def is_positive_constants(pr_matrix):
    for i in range(1, len(pr_matrix)):
        if pr_matrix[i][-2] < 0:
            return False

    return True


def is_positive_ci(simplex_matrix):
    for i in range(0, len(simplex_matrix[-1])):
        if simplex_matrix[-1][i] < 0:
            return False

    return True


def build_identity_matrix(pr_matrix):
    var_num = len(pr_matrix[-1]) - 2
    matrix_identity, base = [], []

    for i in range(0, len(pr_matrix) - 1):
        matrix_identity.append([])
        base.append(var_num + i)

        for j in range(0, len(pr_matrix) - 1):
            matrix_identity[i].append(int(i == j))

    return matrix_identity, base


def build_simplex_matrix(pr_matrix):
    simplex_matrix = []
    is_max_problem = pr_matrix[0][-1] == "max"

    matrix_identity, base = build_identity_matrix(pr_matrix)

    for i in range(1, len(pr_matrix)):
        simplex_matrix.append(
            pr_matrix[i][:-2]
            + (matrix_identity[i - 1] * is_sup_or_inf(pr_matrix[i]))
            + [pr_matrix[i][-2]]
        )

    simplex_matrix.append([])

    for i in range(0, len(pr_matrix[0]) + len(pr_matrix) - 1 - 1):
        simplex_matrix[-1].append(
            (pr_matrix[0][i] if i in range(0, len(pr_matrix[0]) - 1) else 0) *
            -1 if is_max_problem else 1
        )

    return simplex_matrix, base


def get_min_in_last_row(fn_line):
    most_min = min(fn_line)

    return fn_line.index(most_min)


def get_min_ratio(simplex_matrix, j_min):
    ratios = [
        abs(simplex_matrix[i][-1] / simplex_matrix[i][j_min]) for i in range(0, len(simplex_matrix[:-1]))
    ]

    min_ratio = min(ratios)

    return ratios.index(min_ratio)


def divide_pivot_line_by_pivot(simplex_matrix, pivot_i, pivot_j):
    pivot = simplex_matrix[pivot_i][pivot_j]

    simplex_matrix[pivot_i] = [(1 / pivot) * simplex_matrix[pivot_i][j]
                               for j in range(len(simplex_matrix[pivot_i]))]


def perform_operation_on_line_with_pivot_line(simplex_matrix, line_i, pivot_i, pivot_j):
    line = simplex_matrix[line_i]
    pivot_line = simplex_matrix[pivot_i]

    simplex_matrix[line_i] = [-line[pivot_j] * pivot_line[i] + line[i]
                              for i in range(len(line))]


def get_sols(pr_matrix, simplex_matrix, base):
    var_num = len(pr_matrix[-1]) - 2
    x = [0] * var_num

    for i in range(0, len(base)):
        if base[i] < var_num:
            x[base[i]] = simplex_matrix[i][-1]

    return x


def simplex(pr_matrix):
    pr_matrix_copy = copy.deepcopy(pr_matrix)
    var_num = len(pr_matrix_copy[-1]) - 2

    if not is_positive_constants(pr_matrix_copy):
        return False

    simplex_matrix, base = build_simplex_matrix(pr_matrix_copy)

    while(not is_positive_ci(simplex_matrix)):
        pivot_j = get_min_in_last_row(simplex_matrix[-1])
        pivot_i = get_min_ratio(simplex_matrix, pivot_j)

        base[pivot_i] = pivot_j

        divide_pivot_line_by_pivot(simplex_matrix, pivot_i, pivot_j)

        for i in range(0, len(simplex_matrix)):
            if not i == pivot_i:
                perform_operation_on_line_with_pivot_line(
                    simplex_matrix, i, pivot_i, pivot_j)

    x = get_sols(pr_matrix_copy, simplex_matrix, base)
    z = sum([x[i] * pr_matrix_copy[0][i]
             for i in range(0, len(pr_matrix_copy[0]) - 1)])

    return z, x

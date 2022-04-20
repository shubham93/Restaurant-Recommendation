from . import db

def get_dictionary_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def query_db(query, args=(), get_one=False):
    conn = db.get_db()
    conn.row_factory = get_dictionary_factory
    cur = conn.execute(query, args)
    rv = cur.fetchall()
    conn.commit()
    cur.close()
    return (rv[0] if rv else None) if get_one else rv


def update_db(query, args=()):
    conn = db.get_db()
    cur = conn.execute(query, args)
    conn.commit()
    cur.close()
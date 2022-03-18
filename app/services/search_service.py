from app.models import Book

class SearchService:
    """
    Services searches across models.
    """

    def search_all_books(query):
        """
        Returns all book matches for a given search query.
        Searches by author and title.
        """
        books = Book.query.filter(Book.title.ilike(query + '%') | Book.author.ilike(query + '%')).all()

        return books


    def search_some_books(query, limit):
        """
        Returns book matches for a given search query, limited to a give number of results.
        Searches by author and title.
        """
        books = Book.query.filter(Book.title.ilike(query + '%') | Book.author.ilike(query + '%')).limit(limit).all()

        return books

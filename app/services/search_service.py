from app.models import Book

class SearchService:
    """
    Services searches across models.
    """

    def search_books(query):
        """
        Returns all book matches for a given search query.
        Searches by author and title.
        """
        books = Book.query.filter(Book.title.ilike(query + '%') | Book.author.ilike(query + '%')).all()

        return books


    def search_5_books(query):
        """
        Returns first five book matches for a given search query.
        Searches by author and title.
        """
        books = Book.query.filter(Book.title.ilike(query + '%') | Book.author.ilike(query + '%')).limit(5).all()

        return books

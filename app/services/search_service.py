from app.models import Book

class SearchService:
    """
    Services searches across models.
    """

    def search_books(query):
        """
        Returns first five book matches for a given search query.
        Searches by author and title.
        """
        titles = Book.query.filter(Book.title.ilike(query + '%')).limit(5).all()
        authors = Book.query.filter(Book.author.ilike(query + '%')).limit(5).all()

        return [titles, authors]

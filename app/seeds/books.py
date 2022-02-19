from app.models import db, Book
from datetime import datetime

def seed_books():
    book_1 = Book(
        title='The Diving Bell and the Butterfly',
        author='Jean-Dominique Bauby',
        synopsis='A memoir by journalist Jean-Dominique Bauby. It describes his life before and after a massive stroke left him with locked-in syndrome.',
        image_url='https://i.imgur.com/wpX1lf4.jpg',
        isbn13='9780375701214',
        original_title='Le Scaphandre et le Papillon',
        publication_year=1998,
        pages=132,
        language='English',
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_2 = Book(
        title='White Oleander',
        author='Janet Fitch',
        synopsis='Everywhere hailed as a novel of rare beauty and power, White Oleander tells the unforgettable story of Ingrid, a brilliant poet imprisoned for murder, and her daughter, Astrid, whose odyssey through a series of Los Angeles foster homes--each its own universe, with its own laws, its own dangers, its own hard lessons to be learned--becomes a redeeming and surprising journey of self-discovery.',
        image_url='https://i.imgur.com/oEKA2PT.jpg',
        isbn13='9780316182546',
        language='English',
        pages=446,
        publication_year=2001,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_3 = Book(
        title='House of Leaves',
        author='Mark Z. Danielewski',
        synopsis='Years ago, when House of Leaves was first being passed around, it was nothing more than a badly bundled heap of paper, parts of which would occasionally surface on the Internet. No one could have anticipated the small but devoted following this terrifying story would soon command. Starting with an odd assortment of marginalized youth—musicians, tattoo artists, programmers, strippers, environmentalists, and adrenaline junkies—the book eventually made its way into the hands of older generations, who not only found themselves in those strangely arranged pages but also discovered a way back into the lives of their estranged children.\n Now, for the first time, this astonishing novel is made available in book form, complete with the original colored words, vertical footnotes, and newly added second and third appendices.\n The story remains unchanged, focusing on a young family that moves into a small home on Ash Tree Lane where they discover something is terribly wrong: their house is bigger on the inside than it is on the outside.',
        image_url='https://i.imgur.com/LmUrKNJ.jpg',
        isbn13='9780385603102',
        language='English',
        pages=710,
        publication_year=2000,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_4 = Book(
        title='The Principles of Uncertainty',
        author='Maira Kalman',
        synopsis="An irresistible invitation to experience life through a beloved artist's psyche, The Principles of Uncertainty is a compilation of Maira Kalman's New York Times columns. Part personal narrative, part documentary, part travelogue, part chapbook, and all Kalman, these brilliant, whimsical paintings, ideas, and images - which initially appear random - ultimately form an intricately interconnected worldview, an idiosyncratic inner monologue.",
        image_url='https://i.imgur.com/LLGsLuq.jpg',
        isbn13='9781594201349',
        publication_year=2007,
        language='English',
        pages=336,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_5 = Book(
        title='Cracking the Coding Interview',
        author='Gayle Laakmann McDowel',
        synopsis="I am not a recruiter. I am a software engineer. And as such, I know what it's like to be asked to whip up brilliant algorithms on the spot and then write flawless code on a whiteboard. I've been through this as a candidate and as an interviewer.\n Cracking the Coding Interview, 6th Edition is here to help you through this process, teaching you what you need to know and enabling you to perform at your very best. I've coached and interviewed hundreds of software engineers. The result is this book.\n Learn how to uncover the hints and hidden details in a question, discover how to break down a problem into manageable chunks, develop techniques to unstick yourself when stuck, learn (or re-learn) core computer science concepts, and practice on 189 interview questions and solutions.",
        image_url='https://i.imgur.com/QVQ0Vjq.jpg',
        isbn13='9780984782857',
        publication_year=2015,
        language='English',
        pages=687,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_6 = Book(
        title='Kafka on the Shore',
        author='Haruki Murakami',
        synopsis='Translator: Philip Gabriel\nKafka on the Shore, a tour de force of metaphysical reality, is powered by two remarkable characters: a teenage boy, Kafka Tamura, who runs away from home either to escape a gruesome oedipal prophecy or to search for his long-missing mother and sister; and an aging simpleton called Nakata, who never recovered from a wartime affliction and now is drawn toward Kafka for reasons that, like the most basic activities of daily life, he cannot fathom. Their odyssey, as mysterious to them as it is to us, is enriched throughout by vivid accomplices and mesmerizing events. Cats and people carry on conversations, a ghostlike pimp employs a Hegel-quoting prostitute, a forest harbors soldiers apparently unaged since World War II, and rainstorms of fish (and worse) fall from the sky. There is a brutal murder, with the identity of both victim and perpetrator a riddle—yet this, along with everything else, is eventually answered, just as the entwined destinies of Kafka and Nakata are gradually revealed, with one escaping his fate entirely and the other given a fresh start on his own. ',
        image_url='https://i.imgur.com/DljAtXB.jpg',
        isbn13='9781400079278',
        publication_year=2006,
        original_title='海辺のカフカ [Umibe no Kafuka]',
        language='English',
        pages=467,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_7 = Book(
        title='Sense and Sensibility',
        author='Jane Austen',
        synopsis="2003 Edition by Penguin Books\n The more I know of the world, the more am I convinced that I shall never see a man whom I can really love. I require so much!\n Marianne Dashwood wears her heart on her sleeve, and when she falls in love with the dashing but unsuitable John Willoughby she ignores her sister Elinor's warning that her impulsive behaviour leaves her open to gossip and innuendo. Meanwhile Elinor, always sensitive to social convention, is struggling to conceal her own romantic disappointment, even from those closest to her. Through their parallel experience of love—and its threatened loss—the sisters learn that sense must mix with sensibility if they are to find personal happiness in a society where status and money govern the rules of love.",
        image_url='https://i.imgur.com/PtsgqZu.jpg',
        isbn13='9780141439662',
        publication_year=1811,
        language='English',
        pages=409,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_8 = Book(
        title='The Diamond as Big as the Ritz',
        author='F. Scott Fitzgerald',
        synopsis="2005 Edition by Penguin Books\n Although this novella stands out from his body of work in that it's a playful yet sinister fairy tale, it brilliantly fuses F. Scott Fitzgerald's ongoing lush fantasies about the extremes of wealth with his much more somber understanding of what underpins it.  Loosely inspired by a summer he spent as a teenager working on a ranch in Montana, The Diamond as Big as the Ritz is Fitzgerald's hallucinatory paean to the American West and all its promises.\n It's the story of John T. Unger, a young Southerner who goes to Montana for summer vacation with a wealthy college classmate. But the classmate's family proves to be much more than simply wealthy: They own a mountain made entirely of one solid diamond. And they've gone to dreadful lengths to conceal their secret … meaning John could be in danger.\n But the family also has a daughter, lovely Kismine, and with her help, John may yet escape the fate her family has meted out to all their other guests so far …",
        image_url='https://i.imgur.com/cDhDlpM.jpg',
        isbn13='9780141022222',
        publication_year=1922,
        language='English',
        pages=58,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_9 = Book(
        title='Grokking Algorithms: An Illustrated Guide For Programmers and Other Curious People',
        author='Aditya Y. Bhargava',
        synopsis="Grokking Algorithms is a disarming take on a core computer science topic. In it, you'll learn how to apply common algorithms to the practical problems you face in day-to-day life as a programmer. You'll start with problems like sorting and searching. As you build up your skills in thinking algorithmically, you'll tackle more complex concerns such as data compression or artificial intelligence. Whether you're writing business software, video games, mobile apps, or system utilities, you'll learn algorithmic techniques for solving problems that you thought were out of your grasp.",
        image_url='https://i.imgur.com/wOA7oIa.png',
        isbn13='9781617292231',
        publication_year=2015,
        language='English',
        pages=215,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_10 = Book(
        title='The Curious Incident of the Dog in the Night-Time',
        author='Mark Haddon',
        synopsis="Christopher John Francis Boone knows all the countries of the world and their capitals and every prime number up to 7,057. He relates well to animals but has no understanding of human emotions. He cannot stand to be touched. And he detests the color yellow.\n This improbable story of Christopher's quest to investigate the suspicious death of a neighborhood dog makes for one of the most captivating, unusual, and widely heralded novels in recent years.",
        image_url='https://i.imgur.com/h9HwAO1.jpg',
        isbn13='9781400032716',
        publication_year=2004,
        language='English',
        pages=226,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_11 = Book(
        title='Dream of the Red Chamber',
        author='Tsao Hsueh-Chin',
        synopsis="Translator: Chi-Chen Wang\n 1958 Edition by Anchor\n For more than a century and a half, Dream of the Red Chamber has been recognized in China as the greatest of its novels, a Chinese Romeo-and-Juliet love story and a portrait of one of the world's great civilizations. Chi-chen Wang's translation is skillful and accurate.",
        image_url='https://i.imgur.com/UGXtWmY.jpg',
        isbn13='9780385093798',
        publication_year=1791,
        language='English',
        original_title='紅樓夢 [Hónglóu Mèng]',
        pages=352,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_12 = Book(
        title='Invisible Women: Data Bias in a World Designed for Men',
        author='Caroline Criado Pérez',
        synopsis="Data is fundamental to the modern world. From economic development, to healthcare, to education and public policy, we rely on numbers to allocate resources and make crucial decisions. But because so much data fails to take into account gender, because it treats men as the default and women as atypical, bias and discrimination are baked into our systems. And women pay tremendous costs for this bias, in time, money, and often with their lives.\n Celebrated feminist advocate Caroline Criado Perez investigates the shocking root cause of gender inequality and research in Invisible Women, diving into women's lives at home, the workplace, the public square, the doctor's office, and more. Built on hundreds of studies in the US, the UK, and around the world, and written with energy, wit, and sparkling intelligence, this is a groundbreaking, unforgettable exposé that will change the way you look at the world.",
        image_url='https://i.imgur.com/f19dnyh.jpg',
        isbn13='9781419729072',
        publication_year=2019,
        language='English',
        pages=411,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_13 = Book(
        title='Rivers of London',
        author='Ben Aaronovitch',
        synopsis="Book #1 in the Rivers of London Series\n Probationary Constable Peter Grant dreams of being a detective in London's Metropolitan Police. Too bad his superior plans to assign him to the Case Progression Unit, where the biggest threat he'll face is a paper cut. But Peter's prospects change in the aftermath of a puzzling murder, when he gains exclusive information from an eyewitness who happens to be a ghost. Peter's ability to speak with the lingering dead brings him to the attention of Detective Chief Inspector Thomas Nightingale, who investigates crimes involving magic and other manifestations of the uncanny. Now, as a wave of brutal and bizarre murders engulfs the city, Peter is plunged into a world where gods and goddesses mingle with mortals and a long-dead evil is making a comeback on a rising tide of magic.",
        image_url='https://i.imgur.com/IRJsFmT.jpg',
        isbn13='9780575097568',
        publication_year=2011,
        language='English',
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_14 = Book(
        title='Sapiens: A Brief History of Humankind',
        author='Yuval Noah Harari',
        synopsis="2015 Edition by Vintage\n Translated by Prottasha Prachurjo Sayed Fayej Ahmed\n 100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens.\n How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms? How did we come to believe in gods, nations and human rights; to trust money, books and laws; and to be enslaved by bureaucracy, timetables and consumerism? And what will our world be like in the millennia to come?\n In Sapiens, Dr Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical – and sometimes devastating – breakthroughs of the Cognitive, Agricultural and Scientific Revolutions. Drawing on insights from biology, anthropology, paleontology and economics, he explores how the currents of history have shaped our human societies, the animals and plants around us, and even our personalities. Have we become happier as history has unfolded? Can we ever free our behaviour from the heritage of our ancestors? And what, if anything, can we do to influence the course of the centuries to come?\nBold, wide-ranging and provocative, Sapiens challenges everything we thought we knew about being human: our thoughts, our actions, our power ... and our future.",
        image_url='https://i.imgur.com/F4iF3ts.jpg',
        isbn13='9780062316097',
        publication_year=2011,
        language='English',
        original_title='קיצור תולדות האנושות‎ [Ḳitsur toldot ha-enoshut]',
        pages=464,
        created_at=datetime.now(),
        updated_at=datetime.now())

    book_15 = Book(
        title='The People in Trees',
        author='Hanya Yanagihara',
        synopsis="In 1950, a young doctor called Norton Perina signs on with the anthropologist Paul Tallent for an expedition to the remote Micronesian island of Ivu'ivu in search of a rumored lost tribe. They succeed, finding not only that tribe but also a group of forest dwellers they dub \"The Dreamers,\" who turn out to be fantastically long-lived but progressively more senile. Perina suspects the source of their longevity is a hard-to-find turtle; unable to resist the possibility of eternal life, he kills one and smuggles some meat back to the States. He scientifically proves his thesis, earning worldwide fame and the Nobel Prize, but he soon discovers that its miraculous property comes at a terrible price. As things quickly spiral out of his control, his own demons take hold, with devastating personal consequences.",
        image_url='https://i.imgur.com/OGgI147.jpg',
        isbn13='9780385536776',
        publication_year=2013,
        language='English',
        pages=369,
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(book_1)
    db.session.add(book_2)
    db.session.add(book_3)
    db.session.add(book_4)
    db.session.add(book_5)
    db.session.add(book_6)
    db.session.add(book_7)
    db.session.add(book_8)
    db.session.add(book_9)
    db.session.add(book_10)
    db.session.add(book_11)
    db.session.add(book_12)
    db.session.add(book_13)
    db.session.add(book_14)
    db.session.add(book_15)

    db.session.commit()


def undo_books():
    db.session.execute('TRUNCATE books RESTART IDENTITY CASCADE;')
    db.session.commit()

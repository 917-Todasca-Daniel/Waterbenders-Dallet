from .models import Document

import spacy
import pytextrank


def get_document_dto(document):
    return {
        'id': document.id,
        'user_email': document.user_email,
        'document_name': document.document_name,
        'upload_date': document.upload_date,
        'expire_date': document.expire_date,
        'keywords': [
            {
                'text': keyword.text,
            } for keyword in document.keyword_set.all()
        ],
        'reminders': [
            {
                'date': reminder.date,
                'name': reminder.name,
                'id': reminder.id
            } for reminder in document.reminder_set.all()
        ]
    }


def get_all_documents_as_json():
    documents = Document.objects.all()
    documents = [get_document_dto(doc) for doc in documents]
    return documents


def get_keywords(text):
    nlp = spacy.load("ro_core_news_sm")

    # add PyTextRank to the spaCy pipeline
    tr = pytextrank.TextRank()
    nlp.add_pipe(tr.PipelineComponent, name="textrank", last=True)

    doc = nlp(text)

    # examine the top-ranked phrases in the document
    # return [p.text for p in doc._.phrases]
    keywords = []
    for p in doc._.phrases:
        keywords.append(p.text)
        if len(keywords) == 3:
            break
        # print("{:.4f} {:5d}  {}".format(p.rank, p.count, p.text))
        # print(p.chunks)

    return keywords

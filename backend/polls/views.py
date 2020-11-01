from random import randint

from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.views import generic
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import json
from .models import Document, Keyword, Reminder
from .models_functions import get_document_dto, get_keywords
import requests
from .utility_models import CreateDocumentRequest, CreateReminderRequest


class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """
        Return the last five published questions (not including those set to be
        published in the future).
        """
        return Document.objects.filter(
            upload_date__lte=timezone.now()
        ).order_by('-pub_date')[:5]

@csrf_exempt
def documents_view(request):
    body = json.loads(request.body)
    email = body['email']
    print(email)
    documents = Document.objects.filter(user_email=email)

    documents = [get_document_dto(doc) for doc in documents]
    return JsonResponse(documents, safe=False)


@csrf_exempt
def create_document(request):
    document_request = json.loads(request.body)

    content_link = document_request['content']

    content_file = requests.get(content_link, allow_redirects=True)

    document = CreateDocumentRequest(document_request)
    new_doc = Document(user_email=document.user_email, upload_date=document.upload_date,
                       document_name=document.document_name, expire_date=document.expire_date)

    new_doc.save()
    for reminder_json in document_request['reminders']:
        print("REMINDER ------------------")
        reminder = CreateReminderRequest(reminder_json)
        new_reminder = Reminder(document=new_doc, date=reminder.remind_date, name=reminder.name)
        new_reminder.save()

    keywords = get_keywords(content_file.text)
    for keyword in keywords:
        new_keyword = Keyword(text=keyword, document=new_doc)
        new_keyword.save()

    return HttpResponse(new_doc.id)

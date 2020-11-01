import datetime

from django.db import models
from django.utils import timezone


# Create your models here.
class Document(models.Model):
    user_email = models.CharField(max_length=200)
    upload_date = models.DateTimeField('date uploaded')
    document_name = models.CharField(max_length=200)
    expire_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.document_name

    # def was_published_recently(self):
    #     now = timezone.now()
    #     return now - datetime.timedelta(days=1) <= self.pub_date <= now

    # was_published_recently.admin_order_field = 'pub_date'
    # was_published_recently.boolean = True
    # was_published_recently.short_description = 'Published recently?'


class Keyword(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    text = models.CharField(max_length=100)

    def __str__(self):
        return self.text


class Reminder(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)

    date = models.DateField()
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

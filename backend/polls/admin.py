from django.contrib import admin

from .models import Document, Keyword, Reminder


class KeywordInline(admin.TabularInline):
    model = Keyword
    extra = 3


class ReminderInline(admin.TabularInline):
    model = Reminder


class DocumentAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['document_name', 'user_email']}),
        ('Date information', {'fields': ['upload_date', 'expire_date']}),
    ]
    inlines = [KeywordInline, ReminderInline]
    list_display = ('document_name', 'upload_date', 'expire_date', 'user_email')
    list_filter = ['upload_date']
    search_fields = ['document_name']


admin.site.register(Document, DocumentAdmin)

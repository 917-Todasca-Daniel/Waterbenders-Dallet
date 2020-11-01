from django.urls import path
from .email_script import ScriptRunner

from . import views

app_name = 'polls'
urlpatterns = [
    path('documents', views.documents_view, name='index'),
    path('documents/create', views.create_document, name='create'),
    # path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    # path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    # path('<int:question_id>/vote/', views.vote, name='vote'),
    # path('motivation', views.motivation, name='motivation'),
]

script = ScriptRunner()
script.start_script()

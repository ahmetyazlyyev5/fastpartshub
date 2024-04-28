from django.urls import path
from . import views

urlpatterns = [
    path('list-parts/', views.ListPartsView.as_view(), name='list-all-parts'),
]



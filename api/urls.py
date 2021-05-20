from django.urls import path
from . import views

# base App urls
app_name= 'api'

urlpatterns = [
    path('', views.index, name='api_index'),
]
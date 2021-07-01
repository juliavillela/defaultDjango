from django.urls import path
from rest_framework import routers

from . import views

# base App urls
app_name= 'api_frontend'

urlpatterns = [
    path('', views.index, name='api_frontend_index'),
    # path('browse', views.browse, name='browse_api')
]

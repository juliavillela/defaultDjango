from django.urls import path
from . import views

# base App urls
app_name= 'base'

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard', views.dashboard, name='dashboard')
]
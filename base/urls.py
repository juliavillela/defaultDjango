from django.urls import path
from . import views

# base App urls
app_name= 'base'

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('reboot', views.reboot, name="reboot"),
    path('classes', views.classes, name='classes'),
    path('variables', views.variables, name='variables'),
    path('notes', views.notes, name='notes')
]
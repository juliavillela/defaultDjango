from django.urls import path
from . import views

# base App urls

urlpatterns = [
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('signup', views.register_view, name='register'),
]
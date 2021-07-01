from django.urls import path
from rest_framework import routers

from . import views

# base App urls
app_name= 'api'

urlpatterns = [
    path('', views.index, name='api_index'),
]

router = routers.SimpleRouter(True)
router.register(r'dummy', views.DummyViewSet)

urlpatterns += router.urls
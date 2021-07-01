
from django.db.models import query
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import DummySerializer, PartialDummySerializer
from .models import Dummy
from api import serializers

# Create your views here.
def index(request):
    """An explanation fo the api structure"""
    return render(request, 'api/index.html')

class DummyViewSet(viewsets.ModelViewSet):
    queryset = Dummy.objects.all()
    serializer_class = DummySerializer

    def list(self, request):
        queryset = Dummy.objects.filter(public=True)
        serializer = PartialDummySerializer(queryset, many=True)
        return Response(serializer.data)

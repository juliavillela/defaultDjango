from django.db.models import fields
from rest_framework import serializers

from .models import Dummy
import accounts.models as accounts

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts.User
        fields = ['id', 'username']

class PartialDummySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dummy
        fields = ['id', 'public', 'user', 'title', 'subtitle', 'created_at', 'last_edited']

class DummySerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    html = serializers.SerializerMethodField()
    
    class Meta:
        model = Dummy
        fields = [
            'id', 'public', 'user', 'title', 'subtitle', 'created_at', 'last_edited',
            'content', 'html'
        ]

    def get_content(self, instance):
        return instance.get_content()

    def get_html(self, instance):
        return instance.get_html()
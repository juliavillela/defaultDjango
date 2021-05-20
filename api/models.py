import os
from django.db import models
from accounts.models import User

def md_file_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)

# Create your models here.
class Dummy(models.Model):
    """ a dummy model that belongs to a user
    with timestamps, title, optional subtitle, and file"""
    created_at = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now= True)
    title= models.CharField(max_length=220)
    public = models.BooleanField(default=False)
    subtitle = models.CharField(max_length=800, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dummies')
    md_file = models.FileField(upload_to= md_file_path)

    def __str__(self):
        return self.title

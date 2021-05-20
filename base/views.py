import os
from defaultDjango.settings import MEDIA_ROOT, MEDIA_URL, STATICFILE_DIRS, STATIC_ROOT, STATIC_URL
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import messages
import markdown

# Create your views here.

def index(request):
    print(request.user.is_authenticated)
    messages.info(request, 'Hello!')
    return render(request, 'base/index.html')

def reboot(request):
    return render(request, 'base/view_style.html')

def classes(request):
    return render(request, 'base/classes.html')

def variables(request):
    return render(request, 'base/variables.html')

@login_required
def dashboard(request):     
    return render(request, 'base/dashboard.html')

def notes(request):
    notes = []
    notes_list = ['bootstrap-scss', 'my-custom-scss']
    for note in notes_list:
        dir_path = 'base/static/base/media/notes/'
        note_path = os.path.join(dir_path, f"{note}.md")
        with open(note_path, 'r') as md_file:
            text= md_file.read()
        html = markdown.markdown(text)
        note_obj = {'title': note, 'html': html}
        notes.append(note_obj)
    return render(request, 'base/notes.html', context={'notes': notes})

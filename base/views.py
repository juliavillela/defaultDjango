from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import messages

# Create your views here.

nav_items = [
    {'name': 'home', 'url_for': 'base:index'},
    {'name': 'reboot', 'url_for': 'base:reboot'},
    {'name': 'login', 'url_for': 'login'},

]

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
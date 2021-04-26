from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.

def index(request):
    print(request.user.is_authenticated)
    return render(request, 'base/index.html')

@login_required
def dashboard(request):
    return render(request, 'base/dashboard.html')
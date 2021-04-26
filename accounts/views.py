from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, request
from django.db import IntegrityError
from django.urls.base import reverse

from .models import User
# Create your views here.

success_redirect = 'base:dashboard'
logout_redirect = 'base:index'

def register_view(request):
    template = "accounts/register.html"
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            messages.warning(request, "Passwords must match.")
            return render(request, template)

        # Attempt to create new user
        try:
            user = User.objects.create(username=username, email=email, password=password)
            login(request, user)
            messages.success(request, "Welcome!")
            return HttpResponseRedirect(reverse(success_redirect))
        #if error return form with message    
        except IntegrityError:
            messages.warning(request, "Username already taken.")
            return render(request, template)

    else:
        return render(request, template)

def login_view(request):
    template = "accounts/login.html"

    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        # Check if authentication successful
        if user:
            login(request, user)
            messages.success(request, "hello, there! :)")
            return HttpResponseRedirect(reverse(success_redirect))
        else:
            messages.warning(request, "Invalid username and/or password.")
            return render(request, template)
            
    #GET
    else:
        return render(request, template)

def logout_view(request):
    logout(request)
    messages.success(request, "byebye! :)")
    return HttpResponseRedirect(reverse(success_redirect))
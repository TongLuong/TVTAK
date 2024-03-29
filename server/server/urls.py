from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("home/", include("home.urls")),
    path("", include("home.urls"))
]
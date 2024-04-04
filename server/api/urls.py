# from django.contrib import admin
from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
path('GetAllUser/', views.getData),
path('CreateNewUser/', views.postData),
path('test/', views.controlPump)
]
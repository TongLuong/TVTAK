from django.contrib import admin
from django.urls import include, path
from api import views
urlpatterns = [
    # path("home/", include("home.urls")),
    path('admin/', admin.site.urls),
    path("api/User/", include("api.urls")),
    path("", views.get_api),
]